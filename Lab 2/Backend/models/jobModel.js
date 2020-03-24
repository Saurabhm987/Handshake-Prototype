// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// // var JobModel = new Schema({
// //     jobId: Number,
// //     title: String,
// //     location: String,
// //     salary: Number,
// //     postedDate: new Date(),
// //     description : String,
// //     companyName: String,
// //     profile_pic : String
// // })

// var jobSchema = new Schema({
//     title: {
//         type : String,
//         required: true
//     },
//     name:{
//         type: String, 
//         required: true
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     salary : {
//         type: String,
//         required: true
//     },
//     description:{
//         type: String,
//         required: true
//     }, 
//     jobType:{
//         type: String, 
//     },
//     profilePic:{
//         type: String
//     },
//     postedDate:{
//         type: Date
//     }
// }, {strict: false})

// var Job = mongoose.model('Job', jobSchema);
// module.exports = Job;