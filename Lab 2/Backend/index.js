const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
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

require('./routes/applyJob')(app);
require('./routes/loginCompany')(app);
require('./routes/loginStudent')(app);
require('./routes/postJob')(app);
require('./routes/profileCompany')(app);
require('./routes/profileStudent')(app);
require('./routes/registerCompany')(app);
require('./routes/registerStudent')(app);
require('./routes/updateCompany')(app);
require('./routes/updateStudent')(app);
require('./routes/addEduExp')(app);
require('./routes/getJobBoard')(app);
require('./routes/getJobPosted')(app);
require('./routes/getResume')(app);
require('./routes/uploadStdProfPic')(app);
require('./routes/uploadCmpProfPic')(app);
require('./routes/addSkills')(app);
require('./routes/getEventBoard')(app);
require('./routes/applyEvent')(app);
require('./routes/postEvent')(app);
require('./routes/getDetails')(app);
require('./routes/getStudents')(app);
require('./routes/uploadRes')(app);
require('./routes/getJobAppliedStudents')(app);
require('./routes/changeStatus')(app);


app.listen(3001);
console.log("Server Listening on port 3001")
module.exports = app;

