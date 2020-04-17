const User = require('../models/userModel');

function handle_request(email, callback){
    console.log("Handling get student request");

    User.find(
        {access: "student"},
        {name: 1, college: 1,email:1, "profileInfo.major": 1, "profileInfo.profile_pic": 1},
    )
    .then( response => {
        console.log(' get all student response - ', response)
        const data = response.filter( student => student.email !== email)
        callback(null, data)
    })
    .catch( err => {
        callback(err, null)
    })
}

exports.handle_request = handle_request;
