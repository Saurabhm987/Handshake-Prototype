const passport = require('passport');
require('dotenv').config(); 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const jwtSecret = require('./jwtConfig')
const User = require('../models/userModel');
var kafka = require('../kafka/client');


passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false
        }, 
        (req, email, password, done) => {
            try{
                    User.find({email : email}, function(err, user) {
                        if(err){
                            console.log("error pass searching! ", err);
                            return done(err);
                        }
                        console.log("user: ", user);
                        if(user === null && user === undefined){
                            console.log("user exist!");
                            return done(null, false, {
                                message: 'Email already exist'
                            });
                        }else{

                            console.log("email: ", email);
                            console.log("password: ", password);
                            
                            var newUser = User( {
                                email: email,
                                password: cryptr.encrypt(password),
                                access: req.body.access
                            } );

                            newUser.save(function(err, user) {
                                if(err) {
                                    console.log("error while saving! ", err);
                                    return done(err);
                                }
                                console.log("user created");
                                return done(null, user);
                            })
                        }
                    })
            } catch(err){
                return done(err);
            }
        }
    )
)


passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      (email, password, done) => {
        try {
            console.log("passport login strategy");
            // console.log("email: ", email);
            let req = new Object()
            req.email = email
            req.password = password
            console.log(`passport req: ${req}`)

            kafka.make_request('login', req , (error, result)=>{
                console.log("response after make_request")
                if(error){
                    console.log("error: ", error)
                    res.status(400).end()
                }
                if(result.error){
                    console.log("passport-error: ", result.error)
                    return done(null, false, {message: result.error})
                }
                console.log(`final response: ${result.name}`)
                return done(null, result)
            } )

            // User.findOne({ email : email}, function(err, user){
            //     if(err){
            //         console.log("pass login error !", err);
            //     }
            //     if(user === undefined && user === null){
            //         console.log("user doesn't exist!")
            //         return done(null, false, {message: "Username doesn't exist!"});
            //     }
            //     console.log("userInfo: ", user);
            //     console.log("password hashed", user.password);
            //     const  encryptedpsw = user.password;
            //     const decryptedString = cryptr.decrypt(encryptedpsw);
            //     if(password  === decryptedString){
            //         console.log("user Info: ", user);
            //         return done(null, user.toObject());
            //     }else{
            //         console.log("Password doesn't match!");
            //         return done(null, false, {message: "Incorrect Password"});
            //     }
            // })


        } catch (err) {
          return done(err);
        }
      },
    ),
  );


  // token extracting mechanism
  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
  };
  
passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try{
            console.log("JWT_ID: ", jwt_payload.id);
            User.findOne({email:jwt_payload.id},function(err, result){
                if(err){
                    console.log("Jwt error while searching: ", err );
                }
                if(result === undefined && result === null){
                    console.log("user doesn't exist!");
                    return done(null, false, {message: "user doesnt not exist"})
                }else{
                    console.log("User Exist!");
                    done(null,  result.toObject());
                }
            }) 
        } catch (err){
            console.log("jwt_error:", err)
            done(err);
        }
    })
);