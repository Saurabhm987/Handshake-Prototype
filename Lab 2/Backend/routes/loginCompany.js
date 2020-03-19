const jwt = require ('jsonwebtoken' );
const passport = require('passport'); 
const  jwtSecret  = require( '../config/jwtConfig');

module.exports = app =>{
    app.post('/companyLogin', (req, res, next)=>{
        console.log("calling_passport_company_login........")
        passport.authenticate('login', (err, user, info) => {
            
            console.log("checking auth error........");

            if(err){
                console.log("error: ", err);
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
                    console.log("user ", user);
                        if(user){
                            // console.log("company details: ", user);
                            console.log("assigninName: ", user.name);
                            console.log("assignDescr: ", user.description)
                            let token = jwt.sign({id: user.email, access:user.access, name:user.name, profile_pic:user.profile_pic }, jwtSecret.secret, {
                                expiresIn: 60*60,
                            });
                            console.log("sending header and token............");
                            res.status(200).send({
                                auth: true,
                                token,
                                message: 'success'
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