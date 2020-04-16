const User = require('../models/userModel');

function handle_request(msg, callback){
    console.log("In login handle request:"+ JSON.stringify(msg));
     User.find(
         {access: "company"}, 
         {postedJob: 1, _id: 0}
     )
     .then( response => {
         
        let postedResult = [];

        response.forEach( jobs =>{
                postedResult = [...postedResult ,...jobs.postedJob]
        })
        callback(null, postedResult)
     })
     .catch( error => {
         console.log(`Monog Error : ${error}`)
         callback(err, "Monog Error")
     })
}

exports.handle_request = handle_request;