var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require("hbs");

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');  
var handlebars = require('hbs');

// Bring in the database
require('./app_api/models/db');  

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register the Handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Set the view engine to handlebars (hbs)
app.set('view engine', 'hbs');

// Middleware setup
app.use(logger('dev'));  // Logging
app.use(express.json());  // Body parser for JSON
app.use(express.urlencoded({ extended: false }));  
app.use(cookieParser());  // Cookie parser
app.use(express.static(path.join(__dirname, 'public')));  

// Route setup
app.use('/', indexRouter);  // Wire up the main index route
app.use('/users', usersRouter);  // Wire up the users route
app.use('/travel', travelRouter);  // Wire up the travel route
app.use('/api', apiRouter);  // Wire up the API routes

// Catch 404 errors and forward to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
  // Set locals for error message (only in development mode)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');  
});

const cors = require('cors');
app.use(cors());


module.exports = app;
