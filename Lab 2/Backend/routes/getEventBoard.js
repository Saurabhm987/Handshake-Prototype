const passport = require('passport'); 
const User = require("../models/userModel");

module.exports = app => {
    app.get('/getEventBoard/:requestInfo', (req, res, next) => {
        console.log("event_board");
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }
            console.log("getEventBoard_req_body: ", req.body.params);
            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.student_email !== null){
                if(req.params.requestInfo === "board"){
                    User.find( 
                        {access: "company"},
                        {postedEvent: 1, _id: 0},
                        (err, result)=>{
                            if(err){
                                console.log("err: ", err);
                                res.status(400).end(err);
                            }
                            result = result.filter(event =>{
                                return event.postedEvent.length>0
                            })
                            const data = result[0].postedEvent;
                            console.log("data: ", data);
                            res.json(data);
                        }
                    )
            }else if(req.params.requestInfo === "appliedevents"){
                const email = user.email

                User.findOne(
                    {email: email},
                    {appliedEvent: 1, _id:0},
                    (err, result)=>{
                        if(err){
                            console.log("err: ", err);
                            res.status(400).send({message:"Bad Request!"});
                        }
                        console.log("result: ", result.appliedEvent);
                        const data = result.appliedEvent
                        res.json(data);
                    }
                )
            }else {
                console.log("No parameters recieved !");
                res.end();
            }
            }
        })(req, res, next);
    })
}

