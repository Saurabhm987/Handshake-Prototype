const express = require('express')
var bodyParser = require('body-parser');
var mysql = require('mysql');
var pool = require('./database/db-connection');
var cors = require('cors');
const dotenv = require('dotenv').config();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const passport = require('passport');
const app = express();
require('./config/passport');
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());
app.use(passport.initialize());

// require('./routes/applyEvent')(app);
require('./routes/applyJob')(app);
// require('./routes/home')(app);
// require('./routes/infoCompany')(app);
// require('./routes/infoStudent')(app);
require('./routes/loginCompany')(app);
require('./routes/loginStudent')(app);
// require('./routes/postEvent')(app);
require('./routes/postJob')(app);
// require('./routes/profileCompany')(app);
require('./routes/profileStudent')(app);
require('./routes/registerCompany')(app);
require('./routes/registerStudent')(app);
// require('./routes/updateCompany')(app);
// require('./routes/updateEducation')(app);
require('./routes/updateStudent')(app);
require('./routes/getJobBoard')(app);
require('./routes/getJobPosted')(app);
require('./routes/getJobItem')(app);

app.listen(3001);
console.log("Server Listening on port 3001")
module.exports = app;

