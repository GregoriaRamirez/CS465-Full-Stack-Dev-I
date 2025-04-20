require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const cors = require('cors');
//app.options('*', cors()); 

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const apiRouter = require('./app_api/routes/index');
const passport = require('./app_api/config/passport');

// Bring in the database
require('./app_api/models/db');
require('./app_api/config/passport');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
app.set('view engine', 'hbs');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

 // Enable CORS
app.use(cors({
origin: 'http://localhost:4200', 
 methods: ['GET', 'POST', 'PUT', 'DELETE'],
 allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization'],
}));  


// Route setup
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);


// Catch 404 errors
app.use(function(req, res, next) {
  next(createError(404));
});

// Catch unauthorized errors and create 401
app.use((err, req, res, next) => { 
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({ "message": err.name + ": " + err.message });
  } else {
    next(err); 
  }
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
