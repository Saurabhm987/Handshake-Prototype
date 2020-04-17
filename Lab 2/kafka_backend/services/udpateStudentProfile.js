const User = require('../models/userModel');
const mongoose = require('mongoose');

function handle_request(req, callback){
    console.log("Handling update login request");
    console.log("Login_update_message: ",req);

    const { email, options, update_query } = req

    console.log('email - ', email)
    console.log('options - ', options)
    console.log('update_query - ', update_query)

    User.findOneAndUpdate(
        email,
        update_query,
        options
    )
    .then( () => {
        console.log('login update response - '. response)
        callback(null, {message : 'Profile Updated!'})
    })
    .catch(err => {
        console.log('update login error - ', err)
        // callback(err, null)
    })
};

exports.handle_request = handle_request;

