const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity. For production, restrict this.
        methods: ["GET", "POST"]
    }
});

// In-memory "database"
// rooms = {
//   'roomName': {
//     users: { 'socket.id': 'username' },
//     messages: [ { username, message, timestamp } ], // Capped at 20
//     typing: { 'socket.id': 'username' }
//   }
// }
const rooms = {};
const MAX_MESSAGES = 20;

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // --- Join Room ---
    socket.on('join_room', ({ username, room }) => {
        // Create room if it doesn't exist
        if (!rooms[room]) {
            rooms[room] = {
                users: {},
                messages: [],
                typing: {}
            };
        }

        // Add user to room
        socket.join(room);
        rooms[room].users[socket.id] = username;
        
        // Store room and username on the socket object for later use
        socket.currentRoom = room;
        socket.username = username;

        console.log(`User ${username} (${socket.id}) joined room ${room}`);

        // Send last 20 messages to the user who just joined
        socket.emit('message_history', rooms[room].messages);

        // Broadcast to room that a new user has joined (system message)
        socket.to(room).emit('receive_message', {
            isSystem: true,
            message: `${username} has joined the room.`
        });

        // Broadcast updated user list to everyone in the room
        io.to(room).emit('user_list_update', Object.values(rooms[room].users));
    });

    // --- Send Message ---
    socket.on('send_message', ({ message }) => {
        const { currentRoom, username } = socket;

        if (currentRoom && username && message) {
            const messageData = {
                username,
                message,
                timestamp: new Date()
            };

            // Store message
            const roomData = rooms[currentRoom];
            roomData.messages.push(messageData);
            
            // (Bonus) Cap message history
            if (roomData.messages.length > MAX_MESSAGES) {
                roomData.messages.shift();
            }

            // Broadcast message to everyone in the room
            io.to(currentRoom).emit('receive_message', messageData);

            // Clear sender from typing list
            if (roomData.typing[socket.id]) {
                delete roomData.typing[socket.id];
                // Broadcast updated typing list
                io.to(currentRoom).emit('typing_broadcast', Object.values(roomData.typing));
            }
        }
    });

    // --- Typing Events ---
    socket.on('typing', () => {
        const { currentRoom, username } = socket;
        if (currentRoom && username) {
            const roomData = rooms[currentRoom];
            roomData.typing[socket.id] = username;
            
            // Broadcast typing list (excluding the sender)
            socket.to(currentRoom).emit('typing_broadcast', Object.values(roomData.typing));
        }
    });

    socket.on('stop_typing', () => {
        const { currentRoom } = socket;
        if (currentRoom && rooms[currentRoom] && rooms[currentRoom].typing[socket.id]) {
            delete rooms[currentRoom].typing[socket.id];
            
            // Broadcast updated typing list
            io.to(currentRoom).emit('typing_broadcast', Object.values(rooms[currentRoom].typing));
        }
    });

    // --- Disconnect ---
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        const { currentRoom, username } = socket;

        if (currentRoom && username && rooms[currentRoom]) {
            const roomData = rooms[currentRoom];

            // Remove user from users list
            delete roomData.users[socket.id];
            
            // Remove user from typing list
            delete roomData.typing[socket.id];

            // Broadcast that user has left
            socket.to(currentRoom).emit('receive_message', {
                isSystem: true,
                message: `${username} has left the room.`
            });

            // Broadcast updated user list
            io.to(currentRoom).emit('user_list_update', Object.values(roomData.users));
            
            // Broadcast updated typing list
            io.to(currentRoom).emit('typing_broadcast', Object.values(roomData.typing));

            // Optional: Delete room if empty
            if (Object.keys(roomData.users).length === 0) {
                console.log(`Room ${currentRoom} is empty, deleting...`);
                delete rooms[currentRoom];
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
});
