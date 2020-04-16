const passport = require('passport'); 
const User = require('../models/userModel');
var kafka = require('../kafka/client');

module.exports = app => {
    app.post('/registerStudent', (req, res, next )=>{
        passport.authenticate('register', (err, user, info) => {
            console.log("IN_REGISTER_PASS_AUTH");

            if(err){
                console.log("ERROR: ", err);
            }
            
            if(info !== undefined ){
                console.error(info.message);
                res.status(403).send(info.message);
            }else {

                req.logIn(user, error => {

                    const email =  user.email;
                    req.body.email = email
                    
                    kafka.make_request('student_register', req.body, (error, result)=>{
                        console.log("response after make_request")
                        if(error){
                            console.log("error: ", error)
                            res.status(400).end()
                        }
                        if(result.error){
                            console.log("error: ", result.error)
                        }
                        console.log("Final response: ")
                        console.log(result.message)
                        res.status(200).send({
                            message: result.message
                        })
                    } )

                    // const email =  user.email;
                    // const access = "student"
                    // console.log("PASSPORT_EMAIL: ", email)
                    // User.updateOne({email: email }, { "name": req.body.name, "college": req.body.uniName, access: access }, {upsert: true}, function(err, user){
                    //     if(err){
                    //         console.log("error while inserting!", err);
                    //         res.status(200).send({
                    //             message: "Error While Inserting!"
                    //         })
                    //     }
                    //     console.log("record updated ! ");
                    //     res.status(200).send({
                    //         message: "User Created!"
                    //     })
                    // })
                })
            }
        })(req, res, next);
    });
}