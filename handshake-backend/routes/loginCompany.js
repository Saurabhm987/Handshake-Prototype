const jwt = require ('jsonwebtoken' );
const passport = require('passport'); 
const  jwtSecret  = require( '../config/jwtConfig');
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
    app.post('/companyLogin', (req, res, next)=>{
        console.log("calling_passport_company_login........")
        passport.authenticate('companyLogin', (err, user, info) => {
            console.log("checking auth error........");
            if(err){
                console.error(`error ${err}`);
            }

            if(info !== undefined){
                console.error(info.message);
                    if(info.message == "Email doesn't match"){
                        console.log("Email doesn't match!")
                        res.status(200).end(info.message);
                    }else{
                        console.log("password doesn't match");
                        res.status(200).end(info.message);
                    }
            }else{
                console.log("no aut error........");
                console.log("session assigning..........");
                // assigns session to the user 
                req.logIn(user, () => {

                    console.log("user_info_in_req.logIn_login_company : ", user);

                        if(user){
                            console.log("user.company_email ", user.company_email);
                            let token = jwt.sign({id: user.company_email}, jwtSecret.secret, {
                                expiresIn: 60*60,
                            });
                            console.log("sending header and token............");
                            res.status(200).send({
                                auth: true,
                                token,
                                message: 'user found & logged in'
                            });
                        }  
                console.log("token has been assigned.......")

                console.log("user has loged in.......")
            });
            console.log("exiting...............");
        }
        console.log("Possibly callback fun call.........");
    })(req, res, next);
    });
    console.log("route ends..........");
};