const User = require('../models/userModel');

function handle_request(req, callback){
    console.log("Handling get event details request");
    const {email , _id} = req

    User.findOne(
        {email: email}, 
        {"postedEvent": 1, "_id": 0},
    )
    .exec()
    .then( result => {

        result = result.postedEvent;
        resultArray = []
        resultArray = result.filter( event =>{
            return event._id == _id
        })
        callback(null, resultArray)
    })
    .catch( err => {
        console.log('error -', err)
        callback(err, null)
    })

}

exports.handle_request = handle_request;
