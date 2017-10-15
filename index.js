/* ===================
   Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const passport = require('passport');
const config = require('./config/database'); // Mongoose Config
require('./config/passport')(passport);
const path = require('path'); // NodeJS Package for file paths
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

// Database Connection
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for frontend

// Passport and Express setup
app.use(session({ secret: 'passport' }));
app.use(passport.initialize());
app.use(passport.session());

const authentication = require('./routes/authentication')(router, passport); // Import Authentication Routes
app.use('/authentication', authentication);

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// Start Server: Listen on port 8080
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
