const path = require("path");
const express = require("express");
const publicPath = path.join(__dirname, "..", "public");

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log("server up on port 3000");
})

