var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JobModel = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    _id: mongoose.Types.ObjectId,
    name: String,
    eventName: String,
    eventLocation: String,
    eventDescription: String,
    eventEligible: String,
    profile_pic: String
})

var AppliedEvent = new Schema({
    _id: String,
    name: String,
    company_name: String,
    status: String,
    profile_pic: String,
    location: String, 
    date: {type: Date, default: Date.now}
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
    appliedEvent:[AppliedEvent],
    profileInfo: {
        type: Object
    }
}, {strict: false})

var User = mongoose.model('User', userSchema);
module.exports = User;