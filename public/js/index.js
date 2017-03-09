var socket = io();

socket.on("connect", function () {
    console.log("fetch rooms");
    socket.emit("getRooms", function (err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log("no error");
        }
    });
});

socket.on("allRooms", function (rooms) {

    $.each(rooms, function (i, item) {
        $("#room-selector").append($('<option>', {
            value: item,
            text: item
        }));
    });
});