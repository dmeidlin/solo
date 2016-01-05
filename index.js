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
  io.emit('user in', 'A new user has entered.');
  socket.on('disconnect', function() {
    console.log('User disconnected.');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
}); 

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });

server.listen(port, function () {
  console.log('listening on *:' + port);
});
