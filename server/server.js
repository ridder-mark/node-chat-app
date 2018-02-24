const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {

console.log('new user connected');

socket.emit('newMessage', {
  from: 'john',
  text: 'fak u too',
  createdAt: 123123
})

socket.on('createMessage', (message)=> {
  console.log('create message', message);
});

socket.on('disconnect', () => {
  console.log('User was disconnected');
});

});


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
