const User = require('../models/userModel');

function handle_request(req, callback){
    console.log("Handling add education request");
    console.log("update_education_message: ",req);

    const { find_query, options, update_query } = req

    console.log('findQuery - ', find_query)
    console.log('options - ', options)
    console.log('update_query - ', update_query)

    User.findOneAndUpdate(
        find_query,
        update_query,
        options
    )
    .then( response => {
        if(response){
            response = response.toObject()
            console.log('db update result - ', response.education)
            callback(null, response.education)
        }
        // callback(null, {message: 'Updated Education'})
        // res.status(200).send({message:"Added Education"});
    })  
    .catch( err => {
        console.log("error: ", err);
        callback(err, null)
        // res.status(400).send({msg: "bad request!"});
    })

}

exports.handle_request = handle_request;
