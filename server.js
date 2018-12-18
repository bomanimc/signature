const Express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = new Express();
const server = http.Server(app);
const io = socket(server);

app.set('port', (process.env.PORT || 3000));
app.set('env', (process.env.NODE_ENV || 'production'));
app.use(Express.static(__dirname + '/static'));

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

// start the server (using 'server.listen' for compatibility with socket.io)
server.listen(app.get('port'), function() {
  console.log(
    `[${app.get('env')}] Express server listening on port ${app.get('port')}`
  );
});
