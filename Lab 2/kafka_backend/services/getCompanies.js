const User = require('../models/userModel');

function handle_request(email, callback){
    console.log("Handling get company request");

    User.find(
        {access: "company"},
        {email:1,"profileInfo.name": 1, "profileInfo.location": 1, "profileInfo.profile_pic": 1, _id: 0},
    )
    .exec()
    .then( response => {
        console.log(' get all companies response - ', response)
        const data = response.filter( company => company.email !== email)
        console.log('kafka - company details - ', data)
        callback(null, data)
    })
    .catch( err => {
        callback(err, null)
    })
}

exports.handle_request = handle_request;
