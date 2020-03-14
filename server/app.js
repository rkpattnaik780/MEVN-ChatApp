var createError = require("http-errors");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
const passportSetup = require('./config/passport-setup');
var cors = require('cors');

var app = express();

var index = require('./routes/index');
var authRoutes = require('./routes/auth-routes');

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOption));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["qwefgfds"]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/oauth-test');

var db = mongoose.connection;
db.once('open', function () {
  console.log("Connection to MongoDB succesful...");
}).on('error', function (error) {
  console.log("MongoDB connection error: ", error);
});

app.use('/', index);
app.use('/auth', authRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    status: err.status
  });
});

module.exports = app;
