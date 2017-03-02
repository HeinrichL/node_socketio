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

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    // socket.emit("newEmail", {haha: "jaslkdfj"});

    // socket.on("createEmail", (email) => {
    //     console.log("new mail arrived to server:", JSON.stringify(email));
    // });

    socket.on("createMessage", (message) => {
        console.log(message.createdAt+ " ["+ message.from+ "]:", message.text);
    })

    socket.emit("newMessage", {
        from: "server", 
        text: "hallo", 
        createdAt: new Date().getTime()});  
});

server.listen(port, () => {
    console.log("server up on port", port);
});

