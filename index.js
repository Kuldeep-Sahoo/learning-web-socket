const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);

  socket.on("chat-message", (message) => {
    console.log("message received ", message);
    io.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
  socket.on("typing...", () => {
    socket.broadcast.emit("typing...","Someone");
    // io.emit("typing...", "Someone");
});
socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing");
    // io.emit("stop-typing", "Someone");
  });
});

// server frontend files
app.use(express.static(path.join(__dirname, "public")));

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
