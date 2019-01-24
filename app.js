var express = require('express');
var config = require('config');
var bodyParser = require('body-parser');
var session = require('express-session');
var sockerio = require('socket.io');

var controller = require(__dirname + "/apps/controllers");


var app = express();


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

app.use("/static", express.static(__dirname + "/public"));

app.use(controller);

var host = config.get("server.host");
var port = config.get("server.port");

var server = app.listen(port, host, function () {
  console.log("Running on port ", port);
});

var io = sockerio(server);

var socketcontrol = require('./apps/common/socketcontrol')(io);

module.exports = app;
