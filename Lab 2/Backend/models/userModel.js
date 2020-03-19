var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access : {
        type: String,
        required: true
    },
    postedJob:{
        type: Array,
    }
}, {strict: false})

var User = mongoose.model('User', userSchema);

module.exports = User;