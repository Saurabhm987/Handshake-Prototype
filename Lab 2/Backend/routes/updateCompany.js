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
         
                let options = {
                    upsert: true, 
                    new: true,
                    useFindAndModify: false,
                }

                User.findOneAndUpdate(
                    { email : email},
                    {
                        "profileInfo.location" : reqObj.location, "profileInfo.contact": reqObj.contact
                    },
                    options
                )
                .exec()
                .then(response => {
                    response = response.toObject()
                    const {location, contact } = response.profileInfo
                    console.log(`update response profileinfo - ${response.profileInfo}`)
                    res.json({location: location, contact:contact})
                })
                .catch( error => {
                    console.log(`error : ${error}`)
                    res.end()
                })

    }else if(req.body.params.requestInfo === "DESCR"){
        let email = user.email;
        let description = req.body.params.data
        console.log('description : ', description)


        let options = {
            upsert: true, 
            new: true,
            useFindAndModify: false,
        }

        User.findOneAndUpdate(
            {email : email},
            { "profileInfo.description" : description },
            options
        )
        .then( response => {
            response = response.toObject()
            res.json(response.profileInfo.description)
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
