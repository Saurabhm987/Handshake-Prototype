const User = require('../models/userModel');

function handle_request(req, callback){
    console.log("In applied event request:"+ JSON.stringify(req));
    
    const find_query = req
    
    User.findOne(
        find_query,
        {appliedEvent: 1, _id:0},
    )
    .then( response => {
        const data = response.appliedEvent
        callback(null, data)
    })
    .catch( err => {
        console.log('error - ', err)
        callback(err, null)
    })
}

exports.handle_request = handle_request;