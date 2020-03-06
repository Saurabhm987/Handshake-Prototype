const jwt = require ('jsonwebtoken' );
const passport = require('passport'); 
const  jwtSecret  = require( '../config/jwtConfig');
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
    app.post('/studentLogin', (req, res, next)=>{
        passport.authenticate('login', (err, user, info) => {
            console.log("IN_LOGIN_STUDENT !");
            if(err){
                console.error(`error ${err}`);
            }
            console.log("No Error............")

            if(info !== undefined){
                console.error(info.message);
                    if(info.message == "Email doesn't match"){
                        console.log("Email doesn't match!")
                        res.status(401).end(info.message);
                    }else{
                        console.log("password doesn't match");
                        res.status(401).end(info.message);
                    }
            }else{
                console.log("session assigning..........");

                // assigns session to the user 
                req.logIn(user, () => {

                    console.log("user_info_in_req.logIn : ", user);

                        if(user){

                            console.log("FIND_INSERTED_ID: ", user);

                            console.log("user.insertId: ", user.student_email);

                            let token = jwt.sign({id: user.student_email}, jwtSecret.secret, {
                                expiresIn: 60*60,
                            });
                            console.log("sending header and token............")
                            res.status(200).send({
                                auth: true,
                                token,
                                message: 'user found & logged in'
                            });
                        }  
                console.log("token has been assigned.......")
                // console.log(token);
                console.log("user has loged in.......")
            });
            console.log("exiting...............");
        }
        console.log("Possibly callback fun call.........");
    })(req, res, next);
    });
    console.log("route ends..........");
};