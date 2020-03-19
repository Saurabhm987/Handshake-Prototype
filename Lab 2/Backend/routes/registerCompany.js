const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app => {
    app.post('/registerCompany', (req, res, next )=>{
        console.log("requested_details_before_auth: ", req.body);
        passport.authenticate('register', (err, user, info) => {
            console.log("IN_CMP_PASS_AUTH");
            if(err){
                console.log("error while authenticating :  ", err);
            }
            
            if(info !== undefined ){
                console.log("error_info_message: ", info.message);
                res.status(403).send(info.message);
            }else {
                
               /* The callback can use the arguments supplied to handle the 
                authentication result as desired. Note that when using a custom 
                callback, it becomes the application's responsibility to establish
                 a session (by calling req.login()) and send a response. */
                req.logIn(user, error => {

                    console.log("USER: ", user);
                    const email =  user.email;
                    console.log("PASSPORT_EMAIL: ", email);
                    User.updateOne({email: email }, { 

                        name: req.body.company_name,
                        location: req.body.company_loc,
                        description: req.body.company_descr ,
                        contact: req.body.company_contact

                    }, {upsert: true}, function(err, user){
                        if(err){
                            console.log("error while inserting!", err);
                            res.status(200).send({
                                message: "Error While Inserting!"
                            })
                        }
                        console.log("record updated ! ");
                        res.status(200).send({
                            message: "Company Registered!"
                        })
                    })
                })
            }
        })(req, res, next);
    });
}