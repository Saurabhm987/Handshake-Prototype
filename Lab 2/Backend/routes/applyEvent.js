const passport = require('passport'); 
const User = require("../models/userModel");

module.exports = app =>{
        app.post('/applyEvent', (req, res, next)=>{
            passport.authenticate('jwt', (err, user, info) => {
            if(err){
                console.log("post_job_after_passport_error: ", err);
            }
            if(info !== undefined){
                console.log("pass_info_message: ", info.message);
                res.status(200).send({
                    message: info.message
                });
            }else{
                if(req.body.params === ""){
                    console.log("No parameters sent !!", req.body);
                    return  res.status(400).end();
                }
                console.log("applied_event_details: ", req.body.params);
                eventDetails = new Object();

                 eventDetails._id = req.body.params.event_id;
                 eventDetails.name = req.body.params.event_name; 
                 eventDetails.company_name = req.body.params.company_name; 
                 eventDetails.status = req.body.params.event_status;
                 eventDetails.profile_pic = req.body.params.profile_pic;
                 eventDetails.location = req.body.params.event_loc;

                 const email = user.email   

                 const company_name = req.body.params.company_name
                 studentApplied = new Object()
                 studentApplied.name = user.name
                 studentApplied.title = req.body.params.event_name
                 studentApplied._id = req.body.params.event_id
                 studentApplied.profile_pic = req.body.params.profile_pic;
                 studentApplied.email = user.email
                 studentApplied.status = "Applied"
 
                 User.updateOne(
                     { "profileInfo.name" : company_name },
                     {
                         $push:{"studentAppliedEvent": studentApplied}
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
                    {email: email},
                    {$push: {"appliedEvent": eventDetails }},
                    {upsert: true},
                    (error)=>{
                        if(error){
                            console.log("error: ", error);
                            res.status(400).send(error);
                        }
                        res.status(200).send({message: "Event Posted!"})
                    }
                )
            }
             })(req, res, next);
        })
}
