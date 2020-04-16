const passport = require('passport'); 
const User = require('../models/userModel')
// const uploadFile = require('../config/s3BucketUpload');
  
module.exports = app => {
app.post('/updateCompanyProfile',  (req, res, next) =>{
    console.log('update profile')
    passport.authenticate('jwt', {session: false}, (err, user, info) =>{

        if(err){
            console.log("updateStudent_ERROR: ",   err);
        }
    
    if(info !== undefined){
        console.log("ERROR_MESSGE_UPDATE_STUDENT",   info.message);
        res.json({error : info.message});

    }else if(user.email !== ""){
        if(req.body.params.requestInfo === "LOGIN"){
                let reqObj = req.body.params.data;
                const email = user.email;
         
                User.findOneAndUpdate(
                    { email : email},
                    {
                        $set: {location : reqObj.location, contact: reqObj.contact}
                    }
                )
                .then(response => {
                    console.log(`response - ${response}`)
                    res.end()
                })
                .catch( error => {
                    console.log(`error : ${error}`)
                    res.end()
                })

    }else if(req.body.params.requestInfo === "DESCR"){
        let email = user.email;
        let description = req.body.params.data
        console.log('description : ', description)
        User.findOneAndUpdate(
            {email : email},
            { description : description },
            {new : true}
        )
        .then( response => {
            response = response.toObject()
            res.json(response.description)
        })
        .catch( error => {
            console.log(`error : ${error}`)
            res.end()
        })
    }else{
        console.log("PLEASE_PROVIDE_SUMMARY_PARAMS!");
        console.log("request_query", req);
    }
    }else{
        console.log("INVALID TOKEN!");
        res.status(200).send({
            message: 'UNAUTHORIZED'
        })
    }
})(req, res, next);
});
}
