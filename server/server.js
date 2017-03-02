const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "..", "public");
var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("welcomeMessage", generateMessage("Admin",
            "Welcome to the chat app"));

    socket.broadcast.emit("userJoined", generateMessage("Admin",
            "New user joined chat room"));

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("createMessage", (message) => {
        console.log(message.createdAt+ " ["+ message.from+ "]:", message.text);
        io.emit("newMessage", generateMessage(message.from, message.text));
    });
 
});

server.listen(port, () => {
    console.log("server up on port", port);
});

