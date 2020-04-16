var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobModel = new Schema({
    job_id: String,
    title: {
        type:String,
        text: true
    },
    location: String,
    salary: Number,
    postedDate: {
        type: Date,
        default: Date.now
    },
    description : String,
    name: String,
    profile_pic : String,
    job_type: String
}, 
)

var EventModel = new Schema({
    event_id: String,
    name: String,
    eventName: String,
    eventLocation: String,
    eventDescription: String,
    eventEligible: String,
    eventTime: String,
    profile_pic: String,
    postedDate: {
        type: Date,
        default: Date.now
    },
})

var educationModel = new Schema({
    education_id : String,
    education_details:{
        college: String,
        location: String,
        degree: String,
        major: String,
        yop: String,
        gpa: String
    }
})

var experienceModel = new Schema({
    experience_id: String,
    experience_details:{
        title: String,
        company_name: String,
        location: String, 
        joined_date: String,
        description: String
    }
})

var profileModel = new Schema({
    degree: String,
    gpa: String, 
    grad_date: String, 
    major: String,
    profile_pic: { type: String, default: ''}
})

var AppliedJob = new Schema({
    status: String,
    name: String,
    position:String,
    job_id: String,
    date: {type: Date, default: Date.now}
}
)

var AppliedEvent = new Schema({
    _id: String,
    name: String,
    company_name: String,
    status: String,
    profile_pic: String,
    location: String, 
    date: {type: Date, default: Date.now}
})

var StudentApplied = new Schema({
    name : String,
    title: String,
    job_id: String,
    status: String,
    email: String
})

var EventApplied = new Schema({
    name : String,
    title: String,
    job_id: String,
    status: String,
    email: String
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
    education:{
        type: [educationModel],
        default: undefined
    },
    experience: {
        type: [experienceModel],
        default: undefined
    },
    postedJob: {
        type: [JobModel],
        default: undefined,
        
    },
    postedEvent: {
        type: [EventModel],
        default: undefined
    },
    appliedJob:{ 
        type: [AppliedJob],
        default: undefined
     },
    appliedEvent:{
        type: [AppliedEvent],
        default: undefined
    },
    studentAppliedJob:{
        type:[StudentApplied],
        default: undefined
    },
    skills:{
        type: Array,
        default: undefined
    },
    studentAppliedEvent:{
        type:[EventApplied],
        default: undefined
    },
    profileInfo: {
        profileModel
    }
}, {strict: false}, { typeKey: '$type' })

var User = mongoose.model('User', userSchema);
module.exports = User;