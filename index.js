var express = require("express");
var app = express();

var Index = require("./views/index");

app.set("view engine", "pug");

app.get('/', function (req, res) {
    Index.Render(req, res);
});

app.listen(8000, function () {
    console.log("A client connected");
});