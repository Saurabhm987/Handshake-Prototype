const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app =>{
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

                appliedDetails = new Object();
                appliedDetails.status = "Applied"
                appliedDetails._id = req.body.params.id
                appliedDetails.name = req.body.params.name
                appliedDetails.position = req.body.params.title
                const email = user.email
                console.log('job id - ', appliedDetails._id)

                const company_name = req.body.params.name
                studentApplied = new Object()
                studentApplied.name = user.name
                studentApplied.title = req.body.params.title
                studentApplied.email = user.email
                studentApplied.status ="Applied"
                studentApplied._id = req.body.params.id

                User.updateOne(
                    { name : company_name },
                    {
                        $push:{"studentAppliedJob": studentApplied}
                    }
                )
                .exec()
                .then((response) => {
                    console.log('response  - ', response)
                })
                .catch( error => {
                    console.log('error - ', error)
                })

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
