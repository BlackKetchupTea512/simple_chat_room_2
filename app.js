var express = require('express');
var http = require('http');
var app = express();

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

var server = http.createServer(app).listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  io.sockets.emit("send message", "server","誰か来ました。");

  socket.on('send message', function (name, message) {
    console.log(name, message);
    socket.broadcast.emit("send message", name, message);
  });
});