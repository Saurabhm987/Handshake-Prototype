const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app =>{
        app.post('/postEvent', (req, res, next)=>{
            passport.authenticate('jwt', (err, user, info) => {
            if(err){
                console.log("post_event_after_passport_error: ", err);
            }

            if(info !== undefined){
                console.log("postevent_info_message: ", info.message);
                res.status(200).send({
                    message: info.message
                });

            }else{    
                    console.log("requested body :", req.body );
                    const req_body = Object.assign(req.body.params.data);

                    let name = req_body.company_name; 
                    let profile_pic = req_body.profile_pic;
                    let eventName = req_body.event_name; 
                    let eventLocation = req_body.event_loc;
                    let eventDescription = req_body.event_descr;
                    let eventEligible = req_body.event_eligible;

                    console.log("copy_object: ", req_body);
                    const email = user.email
                    User.updateOne(
                        {email: email},
                        {$push: { "postedEvent":{
                            name: name,
                            profile_pic: profile_pic,
                            eventName: eventName,
                            eventLocation: eventLocation,
                            eventDescription: eventDescription,
                            eventEligible: eventEligible
                        }}},
                        {upsert: true},
                        (err, result)=>{
                            if(err){
                                console.log("error: ", err);
                                res.status(400).send({msg: "Bad request"});
                            }
                            console.log("record updated ! ");
                            res.status(200).send({msg:"event posted"})
                        })
                }
             })(req, res, next);
        })
}