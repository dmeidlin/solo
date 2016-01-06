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

  socket.on('join', function (chatName) {
    io.emit('user in', chatName + ' has entered.');
  });
  
  socket.on('disconnect', function() {
    console.log('User disconnected.');
    io.emit('user out', 'A user has left.');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('typing', function (chatName) {
    io.emit('typing', chatName + ' is typing.');
  });
}); 

server.listen(port, function () {
  console.log('listening on *:' + port);
});

console.log(io.sockets);
