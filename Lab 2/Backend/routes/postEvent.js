const passport = require('passport'); 
var mongoose = require('mongoose');
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
                    const req_body = Object.assign(req.body.params.data);
                    let name = req_body.company_name; 
                    let profile_pic = req_body.profile_pic;
                    let eventName = req_body.event_name; 
                    let eventLocation = req_body.event_loc;
                    let eventDescription = req_body.event_descr;
                    let eventEligible = req_body.event_eligible;
                    let eventTime = req_body.event_time

                    console.log('eventTime' , eventTime)

                    const email = user.email
                    let _id = mongoose.Types.ObjectId().toString();
                    console.log('mongoose id - ', _id)
                    
                    User.updateOne(
                        {email: email},
                        {$push: { "postedEvent":{
                            event_id: _id,
                            name: name,
                            profile_pic: profile_pic,
                            eventName: eventName,
                            eventLocation: eventLocation,
                            eventDescription: eventDescription,
                            eventEligible: eventEligible,
                            eventTime: eventTime
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