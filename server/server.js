//dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const authHelpers = require('./services/auth-helpers');
//set up server
const server = express();
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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//ROUTES
const teamRoutes = require('./routes/teamRoutes');
server.use('/teams', teamRoutes);
const authRoutes = require('./routes/authRouter');
server.use('/auth', authRoutes);
server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found',
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});
