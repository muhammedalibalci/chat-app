const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
require('./db.js')
const User = require('./user')

const botName = 'Chat Bot';

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    let user = new User({ socketId: socket.id, username: username, room: room });
    User.findOne({ username: username }, (er, res) => {
      if (!res) {
        user.save()
      }
    })


    socket.join(user.room);

    socket.emit('message', formatMessage(botName, 'Welcome to Chat!'));

    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );
    User.find({ room: user.room }, (er, res) => {
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: res
      });
    })

  });

  socket.on('chatMessage', msg => {
    User.findOne({ socketId: socket.id }, (er, user) => {
      io.to(user.room).emit('message', msg);
    })
  });

  socket.on('disconnect', () => {
    User.findOne({ socketId: socket.id }, (er, user) => {
      console.log(user);

      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

    })
    User.findByIdAndDelete({ socketId: socket.id }, (er, res) => {

    })
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));