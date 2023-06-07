// REQUIRE
const express = require('express');
const cookieParser = require('cookie-parser');    // accessory
const bodyParser = require('body-parser');        // accessory in express > 4.16
const morgan = require('morgan');
const router = require('./routes/indexRouter.js');


// EXPRESS()
const app = express();


// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));     // accessory in express > 4.16
app.use(bodyParser.json({ limit: '50mb' }));           // accessory in express > 4.16
app.use(cookieParser());       // accessory
app.use(morgan('dev'));


// MIDDLEWARE: CORS CONFIGURATION
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// MIDDLEWARE TO THE ROUTER
app.use('/', router);


// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


// EXPORTS
module.exports = app;
