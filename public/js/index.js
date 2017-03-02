var socket = io();

socket.on("connect", function () {
    console.log("connected to server");
});

socket.on("disconnect", function () {
    console.log("Disconnected from server!");
});

socket.on("newMessage", function (message) {
    printMessage(message);
});

socket.on("welcomeMessage", function (mess) {
    printMessage(mess);
});

socket.on("userJoined", function (mess) {
    printMessage(mess);
});

var printMessage = function (mess) {
    console.log(mess.createdAt + " [" + mess.from + "]:", mess.text);
};

socket.emit("createMessage", {
    from: "asd",
    text: "hi"
}, function(data){
    console.log("acked", data);
});