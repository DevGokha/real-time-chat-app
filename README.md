Real-Time Chat Application

This is a basic real-time chat application built with Node.js, Express, and Socket.IO. It fulfills the "Real-Time Chat Component" challenge, including multiple bonus features like read receipts, typing indicators, and user presence.

This project was built with the assistance of an AI tool (Gemini) to scaffold the initial code, debug asynchronous event handling, and refine the implementation of features like read receipts.

Features

Real-Time Messaging: Instantly send and receive messages.

Multiple Rooms: Create or join unique chat rooms.

User Presence: See a list of all users currently in your room.

Typing Indicators: See when another user is typing.

Message Timestamps: Every message is timestamped.

Read Receipts: See "Delivered ✓", "Read ✓✓", or "Read by all ✓✓" statuses on your messages.

Emoji Picker: A simple emoji picker for common reactions.

Tech Stack

Backend: Node.js, Express, Socket.IO

Frontend: HTML, Tailwind CSS, Socket.IO Client

Project Structure

/
|-- chat-client.html       # The main client-side HTML file (all-in-one)
|-- chat-server.js         # The Node.js (Express & Socket.IO) server
|-- package.json           # Project dependencies and scripts
|-- package-lock.json      # Dependency lock file
|-- .gitignore             # Tells Git what files to ignore
|-- README.md              # You are here!
|-- .env                   # Local environment variables (private)
|-- .env.example           # Example for environment variables


Setup & Running Locally

Follow these instructions to get the project running on your local machine.

1. Prerequisites

Node.js (v18 or newer)

npm (usually included with Node.js)

Git

2. Clone the Repository

Clone this project from GitHub.

git clone [https://github.com/DevGokha/real-time-chat-app.git](https://github.com/DevGokha/real-time-chat-app.git)
cd real-time-chat-app


3. Install Dependencies

Install all the required Node.js packages.

npm install


4. Set Up Environment Variables

Create a .env file in the root of the project.

touch .env


Now, copy the contents of .env.example into your new .env file and set the port.

# .env
PORT=3000


5. Run the Server

Start the backend server.

npm start


Your server should now be running and listening on http://localhost:3000.

6. Run the Client

Simply open the chat-client.html file in your web browser. You can open it in multiple tabs or windows to simulate different users.

Deployment

This application is configured to be easily deployed on services like Render or Railway.

The chat-server.js file is set up to serve the chat-client.html file from its root, so you only need to deploy the server.

Push your code to GitHub.

Connect your repository to a "Web Service" on Render.

Set the Start Command to npm start.

Add an Environment Variable:

Key: PORT

Value: 10000 (Render's preferred port, though 3000 may also work).

Deploy!

API / Socket.IO Events

Here is a brief overview of the key Socket.IO events used in this application.

Client-side Events (Emitting)

join_room(data): Sent when a user joins a room. data = { username, room }

send_message(data): Sent when a user sends a message. data = { message }

typing(): Sent when a user starts typing.

stopped_typing(): Sent when a user stops typing (debounced).

message_read(data): Sent when a client's viewport sees a message. data = { messageId, room }

Server-side Events (Broadcasting)

room_joined(data): Sent to the client after successfully joining. data = { user, room, messages, users }

new_message(data): Broadcast to a room when a new message is sent. data = { id, username, message, timestamp, readBy }

user_list_update(data): Broadcast when a user joins or leaves. data = { users }

typing_broadcast(data): Broadcast when a user is typing. data = { username, isTyping }

message_read_update(data): Broadcast when a user reads a message. data = { messageId, username }

system_message(data): Broadcast for system messages (e.g., user join/leave). data = { ...messageObject, isSystem: true }
