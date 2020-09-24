//dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const server = express();

//set up server

require('dotenv').config();

server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(methodOverride('_method'));
server.use(express.static('public'));
server.use(cookieParser());

//passport
server.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => {
  console.log('---------', req.user ? req.user : 'Unauthenticated', req.path);
  next();
});

//ROUTES
server.use(express.static(path.join(__dirname, 'build')));
const teamRoutes = require('./routes/teamRoutes');
server.use('/teams', teamRoutes);
const authRoutes = require('./routes/authRouter');
server.use('/auth', authRoutes);
const projectRoutes = require('./routes/projectRoutes');
server.use('/projects', projectRoutes);
server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found',
  });
});
server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

//sockets

const http = require('http').createServer(server);
const io = require('socket.io')(http);
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join_room', (room) => {
    console.log('user joined room', room);
    socket.join(room);
  });
  socket.on('card_change', (room) => {
    io.in(room).emit('card_change', room);
  });
  socket.on('message', ({ room, message }) => {
    io.in(room).emit('message', { message, room });
  });

  socket.on('typing', ({ room }) => {
    socket.to(room).emit('typing', 'Someone is typing');
  });

  socket.on('stopped_typing', ({ room }) => {
    socket.to(room).emit('stopped_typing');
  });
});

const PORT = process.env.PORT || 4001;
http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
