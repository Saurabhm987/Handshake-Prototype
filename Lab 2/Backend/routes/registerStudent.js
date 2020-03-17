const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app => {
    app.post('/register', (req, res, next )=>{
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

                    console.log("USER: ", user);
                    const email =  user.email;
                    console.log("PASSPORT_EMAIL: ", email);

                    // const reqData = {
                    //     student_name : req.body.name,
                    //     student_college_name: req.body.uniName,
                    // 

                    // console.log("REQ_DATA: ", reqData);

                    User.updateOne({email: email }, { name: req.body.name, college: req.body.uniName }, {upsert: true}, function(err, user){
                        if(err){
                            console.log("error while inserting!", err);
                            res.status(200).send({
                                message: "Error While Inserting!"
                            })
                        }
                        console.log("record updated ! ");
                        res.status(200).send({
                            message: "User Created!"
                        })
                    })
                })
            }
        })(req, res, next);
    });
}