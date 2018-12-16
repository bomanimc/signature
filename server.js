var Express = require('express');
var app = new Express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(Express.static(__dirname + '/static'));

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home.html');
});

io.on('connection', function (socket) {
  socket.on('getCode', function (data) {
    io.emit('sendCode', {
      html: data.html,
    });
  });
});
