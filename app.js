const express = require('express');
const app = express();
const createError = require('http-errors');
const logger = require('morgan');

const indexRouter = require('./routes/api');

app.use(logger('dev'));
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  	next(createError(404, "Not found"));
});

// Error handler
app.use((err, req, res, next) => {
  	res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;