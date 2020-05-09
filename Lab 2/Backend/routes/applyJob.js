const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app => {
        app.post('/applyJob', (req, res, next)=>{
            passport.authenticate('jwt', (err, user, info) => {
            if(err){
                console.log("post_job_after_passport_error: ", err);
            }

            if(info !== undefined){
                res.status(200).send({
                    message: info.message
                });
            }else{
                if(req.body.params === ""){
                    console.log("No parameters sent !!", req.body);
                    return  res.status(400).end();
                }
                
                studentApplied = new Object()
                console.log('request body - ', req.body.params)
                
                studentApplied.name = user.name
                studentApplied.title = req.body.params.title
                studentApplied.email = user.email
                studentApplied.status ="Applied"
                studentApplied._id = req.body.params.id
                studentApplied.profile_pic = req.body.params.profile_pic
                console.log('student applied details - ', studentApplied)

                const company_name = req.body.params.name
                User.updateOne(
                    { access: 'company', "profileInfo.name" : company_name },
                    {
                        $push:{"studentAppliedJob": studentApplied}
                    }
                )
                .exec()
                .then((response) => {
                    console.log('student applied job response  - ', response)
                })
                .catch( error => {
                    console.log('error - ', error)
                })


                appliedDetails = new Object();
                appliedDetails.status = "Applied"
                appliedDetails._id = req.body.params.id
                appliedDetails.name = req.body.params.name
                appliedDetails.position = req.body.params.title
                appliedDetails.profile_pic = req.body.params.profile_pic
                const email = user.email

                console.log('applied details - ', appliedDetails)

                User.updateOne(  
                    { email: email }, 
                    { $push: {"appliedJob": appliedDetails}},
                )
                .exec()
                .then(() => {
                    res.json({ message: "Job Applied"})
                })
                .catch(() => {
                    res.json({error: "Error while applying to job!"})
                })
            }
             })(req, res, next);
        })
}
