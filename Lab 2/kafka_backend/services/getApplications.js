const User = require('../models/userModel');

function handle_request(email, callback){
    console.log("Handling get student request");

    User.findOne(
        {email: email},
        {appliedJob: 1, _id: 0},
    )
    .exec()
    .then( response => {
        console.log('response - ', response)
        const data = Object.values(response.appliedJob)
        callback(null, data )
    })
    .catch( err => {
        console.log('error -',  err)
        callback(err, null)
    })
}

exports.handle_request = handle_request;
