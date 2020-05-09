var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var userModel = new Schema({
//     id: String,
//     name: String,
//     room: String,
// })

var userSchema = new Schema({
    id: String,
    name: String,
    room: String,
})

var Users = mongoose.model('chatUser', userSchema);
module.exports = Users;