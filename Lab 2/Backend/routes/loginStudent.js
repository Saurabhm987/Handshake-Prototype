const jwt = require ('jsonwebtoken' );
const passport = require('passport'); 
const  jwtSecret  = require( '../config/jwtConfig');

module.exports = app =>{
    app.post('/login', (req, res, next)=>{
        passport.authenticate('login', (err, user, info) => {
            console.log("IN_LOGIN !");
            if(err){
                console.error(`error ${err}`);
            }

            if(info !== undefined){
                console.log( "info-message : " ,info.message);
                res.status(200).send({error: info.message});

            }else{

                req.logIn(user, () => {
                        if(user){
                            let token = jwt.sign({id: user.email, access:user.access}, jwtSecret.secret, {
                                expiresIn: 60*60,
                            });
                            res.status(200).send({
                                auth: true,
                                token,
                                message: 'user found & logged in'
                            });
                        }  
            });
        }
    })(req, res, next);
    });
};