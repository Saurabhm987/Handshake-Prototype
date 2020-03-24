var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JobModel = new Schema({
    title: String,
    location: String,
    salary: Number,
    postedDate: {
        type: Date,
        default: Date.now
    },
    description : String,
    name: String,
    profile_pic : String
})

var EventModel = new Schema({
    name: String,
    eventName: String,
    eventLocation: String,
    eventDescription: String,
    eventEligible: String,
    profile_pic: String
})

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
    postedJob: [JobModel],
    postedEvent: [EventModel],
    appliedJob: Array,
    profileInfo: {
        type: Object
    }
}, {strict: false})

var User = mongoose.model('User', userSchema);
module.exports = User;