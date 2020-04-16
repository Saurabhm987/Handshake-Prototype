const User = require('../models/userModel');
const mongoose = require('mongoose');

function handle_request(req, callback){
    console.log("Handling add experience request");
    console.log("add_experience_message: ",req);

    const { email, update_query, options } = req
    // const {update_query} = req.update_query
    // const { options } = req.options

    console.log('email - ', email)
    console.log('update_query - ', update_query)
    console.log('options - ', options)

    User.findOneAndUpdate(
        email,
        update_query,
        options
    )
    .exec()
    .then( response =>{

        response = response.toObject()
        console.log("exp added : ", response);
        console.log('experience reponse - ', response.experience)
        callback(null, response.experience)

    }).catch ( err =>{

        console.log("err: ", err);
        callback(err, null)

    })

};

exports.handle_request = handle_request;

