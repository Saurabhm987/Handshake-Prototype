const User = require('../models/userModel');
const mongoose = require('mongoose');

function handle_request(req, callback){
    console.log("Handling add education request");
    console.log("add_education_message: ",req);

    const { email, options, update_query } = req

    console.log('email - ', email)
    console.log('options - ', options)
    console.log('update_query - ', update_query)

    User.findOneAndUpdate(
            email,
            update_query,
            options
    )
    .exec()
    .then( response =>{
        response = response.toObject()
        console.log("response: ", response);
        callback(null, response.education)
        // callback(null, {message: 'Added education'})
    }).catch ( err =>{
        console.log("err: ", err);
        callback(err, null)
    })
};

exports.handle_request = handle_request;

