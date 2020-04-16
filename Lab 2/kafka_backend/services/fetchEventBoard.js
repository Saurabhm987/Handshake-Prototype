const User = require('../models/userModel');

function handle_request(msg, callback){
    console.log("In event board request:"+ JSON.stringify(msg));
      User.find( 
            {access: "company"},
            {postedEvent: 1, _id: 0}
        )
        .exec()
        .then( response => {
            let postedEvent = []

            response = response.forEach(event =>{
                postedEvent = [...postedEvent, ...event.postedEvent]
            })            
            callback(null, postedEvent)
        })
        .catch(() => {
            callback(err, null)
        })
}

exports.handle_request = handle_request;