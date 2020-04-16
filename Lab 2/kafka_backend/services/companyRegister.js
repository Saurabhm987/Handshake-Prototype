const User = require('../models/userModel');
const mongoose = require('mongoose');

function handle_request(req, callback){
    console.log("Handling student_register request");
    console.log("company_register_message: ",req);

    var responseObj = new Object()
    const { email } = req
    delete req.email

   User.updateOne(
        {email: email}, 
        { $set : {
                profileInfo : req
            }
        }, 
        {upsert: true}, 
        function(err, user){
            if(err){
                console.log('getting error')
                responseObj.error = err
            }
            console.log(`user : ${user}`)
            responseObj.message = "Company Registered!"
            callback(null, responseObj );
        }
    )
    console.log("responseObj: ", responseObj)
};

exports.handle_request = handle_request;

