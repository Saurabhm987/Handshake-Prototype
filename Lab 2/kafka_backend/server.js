var connection =  new require('./kafka/connection');
var Register = require('./services/studentRegister.js');
var CompanyRegister = require('./services/companyRegister')
var Login = require('./services/login')
var AddEducation = require('./services/addEducation')
var FetchJobBoard = require('./services/fetchJobBoard')
var AddExperience = require('./services/addExperience')
var UpdateStudentProfile = require('./services/udpateStudentProfile')
var UpdateEducation = require('./services/updateEducation')
var UpdateExperience = require('./services/updateExperience')
var FetchEventBoard = require('./services/fetchEventBoard')
var AppliedEvent = require('./services/appliedEvent')
var GetStudents = require('./services/getStudents')
var GetApplications = require('./services/getApplications')
var GetEventDetail = require('./services/getEventDetail')

const mongoose = require('mongoose');
const pool = require('./database/db-connection')

function handleTopicRequest(topic_name,fname){
    console.log("kafka-backend handle topic request")
    
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('kafka server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));

        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){

            if(err){
                console.log("Mongo Error: ", err)
            }

            console.log("handle_request")
            console.log('after handle '+res);
            var payloads = [
                {   topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            console.log("response payload", payloads)
            producer.send(payloads, function(err, data){
                if(err) console.log( `producer error: ${err}` )
                console.log("response has been added on topic ")
                console.log(data);
            });
            return;
        });
    });
}

//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("student_register",Register)
handleTopicRequest("company_register",CompanyRegister)
handleTopicRequest('login', Login)
handleTopicRequest('fetch_job_board',FetchJobBoard)
handleTopicRequest('add_education',AddEducation)
handleTopicRequest('add_experience', AddExperience)
handleTopicRequest('update_student_profile', UpdateStudentProfile)
handleTopicRequest('update_education', UpdateEducation)
handleTopicRequest('update_experience', UpdateExperience)
handleTopicRequest('fetch_event_board', FetchEventBoard)
handleTopicRequest('applied_event', AppliedEvent)
handleTopicRequest('get_students', GetStudents)
handleTopicRequest('get_applications', GetApplications)
handleTopicRequest('get_event_detail', GetEventDetail)