const passport = require('passport')
const User = require('../models/userModel')
var kafka = require('../kafka/client');

module.exports = app => {
    app.get("/getStudents", (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
                if(err){
                    console.log("passport_error: ", err);
                }
                if(info !== undefined){
                    console.log("Info_error" , info.message);
                    res.status(200).send(info.message);
                }else if( user.email !== null){

                    // get except  current user
                    const email = user.email

                    kafka.make_request('get_students',email, (error, result)=>{
                        console.log("response after make_request")
                        if(error){
                            console.log("error: ", error)
                            res.status(400).send({error: "kafka make_request error"})
                        }
                        console.log('get student result  - ', result)
                        res.json(result)
                    })
            }
            else{
                console.log("request_body_absent!");
            }
        })(req, res, next);
    })
}