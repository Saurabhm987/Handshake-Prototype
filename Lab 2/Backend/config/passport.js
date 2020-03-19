const passport = require('passport');
require('dotenv').config(); 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const jwtSecret = require('./jwtConfig')
const User = require('../models/userModel');

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
                    console.log("email : ", email);
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
            console.log("INSIDE_PASSPORTJS");
            console.log("email: ", email);

            User.findOne({ email : email}, function(err, user){
                if(err){
                    console.log("pass login error !", err);
                }

                if(user === undefined && user === null){
                    console.log("user doesn't exist!")
                    return done(null, false, {message: "Username doesn't exist!"});
                }

                console.log("userInfo: ", user);

                console.log("password hashed", user.password);
                const  encryptedpsw = user.password;
                const decryptedString = cryptr.decrypt(encryptedpsw);
                
                if(password  === decryptedString){
                    console.log("user Info: ", user);
                    return done(null, user.toObject());
                }else{
                    console.log("Password doesn't match!");
                    return done(null, false, {message: "Incorrect Password"});
                }
            })
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
        console.log("USING_JWT_STRATEGY");
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



// const options = {
//     jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
//     secretOrKey: jwtSecret.secret,
//   };

// passport.use(
//     'jwtcompany',
//     new JWTstrategy(options, (jwt_payload, done) => {
//         console.log("USING_JWT_COMPANY_STRATEGY");
//         try{
//             console.log("JWT_ID: ", jwt_payload.id);
//             let insertquery = 'SELECT * FROM company_info WHERE ?? = ?';
//             let query = mysql.format(insertquery, ["company_email", jwt_payload.id]);

//             pool.query(query, (err, rows) => {
//                 if(err){
//                     console.log("DB_ERROR: ", err);
//                 }

//                 if(rows.length > 0){
//                     console.log('PASSPORT_USER_EXIST');
//                     done(null,  rows[0]);
//                 }else{
//                     console.log("USER_NOT_EXIST");
//                     // console.log("Result_got: ", rows[0].length);
//                     done(null, false, {message: "user doesnt not exist"});
//                 }
//             })  
//         } catch (err){
//             console.log("jwt_error:", err)
//             done(err);
//         }
//     })
// );