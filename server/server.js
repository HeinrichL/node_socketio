const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "..", "public");
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("welcomeMessage", {
            from: "Admin",
            text: "Welcome to the chat app",
            createdAt: new Date().getTime()
        });
    socket.broadcast.emit("userJoined", {
            from: "Admin",
            text: "New user joined chat room",
            createdAt: new Date().getTime()
        });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("createMessage", (message) => {
        console.log(message.createdAt+ " ["+ message.from+ "]:", message.text);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
 
});

server.listen(port, () => {
    console.log("server up on port", port);
});

