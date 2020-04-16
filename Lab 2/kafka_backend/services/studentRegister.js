const User = require('../models/userModel');
const mongoose = require('mongoose');

function handle_request(req, callback){
    console.log("Handling student_register request");
    console.log("student_register_message: ",req);

    var responseObj = new Object()

    User.updateOne(
        {email: req.email },
        {$set:{
            name: req.name, 
            college: req.uniName, 
            access: req.access 
            }
        }, 
        function(err, user){
            if(err){
                console.log('getting error')
                responseObj.error = err
            }
            console.log(`user : ${user}`)
            responseObj.message = "Student Registered!"
            callback(null, responseObj );
    })
    console.log("responseObj: ", responseObj)
};

exports.handle_request = handle_request;

