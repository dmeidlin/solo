// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
     /* listen to the port set by the service provider;
      otherwise 3000 by default: */
    port = process.env.PORT || 3000;
    

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('A user is connected.');
  socket.on('disconnect', function() {
    console.log('User disconnected.');
  });
}); 

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

//http.listen(...
server.listen(port, function () {
  console.log('listening on *:' + port);
});
