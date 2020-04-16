const passport = require('passport'); 
const User = require('../models/userModel');
var kafka = require('../kafka/client');

module.exports = app => {
    app.post('/registerCompany', (req, res, next )=>{
        console.log(`register company`)
        passport.authenticate('register', (err, user, info) => {
            if(err){
                console.log("error while authenticating :  ", err);
            }
            
            if(info !== undefined ){
                console.log("error_info_message: ", info.message);
                res.status(403).send(info.message);
            }else {

                req.logIn(user, error => {
                    
                    const email =  user.email;
                    req.body.email = email
                    kafka.make_request('company_register', req.body, (error, result)=>{
                        console.log("getting final response")
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
                    })

                    // console.log("USER: ", user);
                    // const email =  user.email;
                    // console.log("PASSPORT_EMAIL: ", email);
                    // User.updateOne({email: email }, { 
                    //     name: req.body.company_name,
                    //     location: req.body.company_loc,
                    //     description: req.body.company_descr ,
                    //     contact: req.body.company_contact

                    // }, {upsert: true}, function(err, user){
                    //     if(err){
                    //         console.log("error while inserting!", err);
                    //         res.status(200).send({
                    //             message: "Error While Inserting!"
                    //         })
                    //     }
                    //     console.log("record updated ! ");
                    //     res.status(200).send({
                    //         message: "Company Registered!"
                    //     })
                    // })
                })
            }
        })(req, res, next);
    });
}