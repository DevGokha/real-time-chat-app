💬 Real-Time Chat Application

A real-time chat application built using Node.js, Express, and Socket.IO.
This project implements instant messaging with features like read receipts, typing indicators, multiple chat rooms, and user presence tracking.

🧠 Built with the assistance of Gemini AI to scaffold the initial codebase, debug asynchronous event handling, and refine advanced features like read receipts.

🚀 Features

⚡ Real-Time Messaging – Instantly send and receive messages.

🏠 Multiple Rooms – Create or join unique chat rooms.

👀 User Presence – View all active users in a room.

✍️ Typing Indicators – See when someone is typing.

🕒 Message Timestamps – Every message is timestamped.

✅ Read Receipts – Track message delivery and read status.

😀 Emoji Picker – React with commonly used emojis.

🧩 Tech Stack

Backend: Node.js, Express, Socket.IO
Frontend: HTML, Tailwind CSS, Socket.IO Client

📁 Project Structure
/
├── chat-client.html       # Main client-side HTML (all-in-one)
├── chat-server.js         # Express & Socket.IO backend server
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Dependency lock file
├── .env                   # Local environment variables (private)
├── .env.example           # Example environment configuration
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation

⚙️ Setup & Running Locally
🧱 Prerequisites

Make sure you have the following installed:

Node.js (v18 or newer)

npm (comes with Node.js)

Git

🪄 Clone the Repository
git clone https://github.com/DevGokha/real-time-chat-app.git
cd real-time-chat-app

📦 Install Dependencies
npm install

🔑 Set Up Environment Variables

Create a .env file in the root directory:

touch .env


Copy the contents of .env.example into .env and set:

PORT=3000

▶️ Run the Server
npm start


Your server will start at:
👉 http://localhost:3000

💻 Run the Client

Simply open chat-client.html in your browser.
You can open multiple tabs or windows to simulate different users.

☁️ Deployment

This app is ready to deploy on platforms like Render or Railway.

Push your code to GitHub.

Connect your repository to a Web Service on Render/Railway.

Set Start Command to:

npm start


Add the environment variable:

Key: PORT
Value: 10000


Deploy 🚀

🔌 API / Socket.IO Events
📤 Client-side Events
Event	Description	Data
join_room	Join a room	{ username, room }
send_message	Send a message	{ message }
typing	Notify typing started	–
stopped_typing	Notify typing stopped	–
message_read	Mark message as read	{ messageId, room }
📥 Server-side Events
Event	Description	Data
room_joined	Confirmation after joining	{ user, room, messages, users }
new_message	Broadcasts new message	{ id, username, message, timestamp, readBy }
user_list_update	Update user list	{ users }
typing_broadcast	Typing indicator	{ username, isTyping }
message_read_update	Update read status	{ messageId, username }
system_message	System event (join/leave)	{ ...messageObject, isSystem: true }
🧠 Future Enhancements

🔒 Add user authentication (JWT / sessions)

💾 Store messages persistently with MongoDB

🎨 Build a React-based frontend

🌐 Deploy with HTTPS and domain configuration

👨‍💻 Author

Dev Gokha
Web Developer | AI & ML Enthusiast
📍 Gwalior,Madhya Pradesh, India
🔗 GitHub Profile
