var socket = io();


function scrollToBottom() {
    // selectors, heights

    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");

    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMsgHeight = newMessage.innerHeight();
    var lastMsgHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}

socket.on("connect", function () {
    var params = $.deparam(window.location.search);

    socket.emit("join", params, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("no error");
        }
    });
});

socket.on("disconnect", function () {
    console.log("Disconnected from server!");
});

socket.on("updateUserList", function (users) {

    var ul = $("<ol></ol>");

    users.forEach(function(user){
        ul.append($("<li></li>").text(user));
    });

    $("#users").html(ul);

    console.log("users:", users);
});

socket.on("newMessage", function (message) {

    var formattedTime = moment(message.createdAt).format("h:mm a")

    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a")

    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);
    scrollToBottom();
});

var printMessage = function (mess) {
    console.log(mess.createdAt + " [" + mess.from + "]:", mess.text);
};

$("#message-form").on("submit", function (e) {
    e.preventDefault();
    var params = $.deparam(window.location.query);
    socket.emit("createMessage", {
        text: $("[name=message]").val()
    }, function () {

    });

    $("[name=message]").val("");
});

var locationButton = $("#send-location");
locationButton.on("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr("disabled").text("Send location");
    }, function () {
        alert("Unable to fetch location");
    })
})