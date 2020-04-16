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

var educationModel = new Schema({
    education_id : String,
    college: String,
    location: String,
    degree: String,
    major: String,
    yop: String,
    gpa: String
})

var experienceModel = new Schema({
    experience_id: String,
    title: String,
    company_name: String,
    position: String, 
    joined_date: String,
    description: String
})

var profileModel = new Schema({
    degree: String,
    gpa: String, 
    grad_date: String, 
    major: String,
    education: [educationModel],
    experience: [experienceModel]
}, {strict: false})

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
    name: {
        type: String,
    },
    college:{
        type: String
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
        profileModel
    }
}, {strict: false})

var User = mongoose.model('User', userSchema);
module.exports = User;