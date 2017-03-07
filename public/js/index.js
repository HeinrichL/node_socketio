var socket = io();

socket.on("connect", function () {
    console.log("connected to server");
});

socket.on("disconnect", function () {
    console.log("Disconnected from server!");
});

socket.on("newMessage", function (message) {
    printMessage(message);
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    $("#messages").append(li);
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

$("#message-form").on("submit", function (e) {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "user",
        text: $("[name=message]").val()
    }, function () {

    });
});