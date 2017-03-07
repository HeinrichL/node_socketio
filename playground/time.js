const moment = require("moment");

var date = moment();
console.log(date.format("MMM Do YYYY hh:mm:ss"));

console.log(date.format("h:mm a"))

var createdAt = 1234;
var date2 = moment(createdAt);
console.log(date2.format("H:mm:ss a"));