const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const passport = require('passport')
const socketio =  require('socket.io')
const http = require('http')
const app = express();
const server = http.createServer(app)
const  io = socketio(server)
const path = require('path');

module.exports=io;
require('./config/passport');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 3001

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static('public/uploads'));

// app.use(express.static("public"));


io.on('connection', (socket)=>{
  socket.on('USER_CONNECT', ({ name, room }, callback) => {
    console.log("user connected")
    const { error, user } = addUser({ id: socket.id, name, room });
    if(error) return callback(error);

    if(user){ 
      io.to(user.id).emit('message', {text: `Welcome ${user.name}`} )
    }

    })

  socket.on('SEND_MESSAGE', ({message, reciever, sender }, callback) => {
    const sendMsgToReciever = getUser(reciever)
    const senderData =  getUser(sender)
    io.to(sendMsgToReciever.id).emit('message', { user: sender, text: message})
    io.to(senderData.id).emit('message', { user: sender, text: message})
    callback();
  })

  socket.on('disconnect', () => {
    console.log('user disconnected!')
  })
})

require('./routes/applyJob')(app);
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
require('./routes/uploadfile')(app);
require('./routes/addSkills')(app);
require('./routes/getEventBoard')(app);
require('./routes/applyEvent')(app);
require('./routes/postEvent')(app);
require('./routes/getDetails')(app);
require('./routes/getStudents')(app);
require('./routes/uploadRes')(app);
require('./routes/getAppliedStudents')(app);
require('./routes/changeStatus')(app);
require('./routes/searchResult')(app);
require('./routes/fetchSkill')(app)

server.listen(PORT , () => console.log(`Server is listening on port ${PORT}`));
module.exports = app;

