// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

var app = require('express')();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

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

/* listen to the port set by the service provider;
 otherwise 3000 by default: */
var port = process.env.PORT || 3000;
var ip = process.env.IP || '127.0.0.1';
//http.listen(...
server.listen(port, ip, function () {
  console.log('listening on *:' + port);
});
