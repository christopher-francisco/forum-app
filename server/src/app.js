const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./config');
const mongoose = require('./mongoose');
const routes = require('./routes');

const app = express();

if (app.get('env') !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  const message = err.message;
  const stack = req.app.get('env') === 'development' ? err.stack : {};

  res.status(err.status || 500);

  res.json({
    stack,
    message,
  });
});

module.exports = app;
