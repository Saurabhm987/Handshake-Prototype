const passport = require('passport');
var mysql = require('mysql');
var pool = require('../database/db-connection');
require('dotenv').config(); 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const jwtSecret = require('./jwtConfig')


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
                let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
                let query = mysql.format(insertQuery, [ "student_email", email]);
            
                pool.query(query, (err, rows)=>{
                    if(err){
                        console.log("PASSPORT: ", err);
                        return done(err);
                    } 
                    if(rows.length){

                        console.log("USERNAME_EXIST!");

                        return done(null, false, {
                            message: 'Email already exist'
                        });

                    }else{

                        console.log("email: ", email);
                        console.log("password: ", password);
                        
                        var newUserMysql = {
                            email: email,
                            password: cryptr.encrypt(password),
                            access:"student"
                        }

                        let insertQuery = 'INSERT INTO ?? ( ??, ??) VALUES (?, ?) ';
                        let query = mysql.format( insertQuery, ["students", "student_email","student_password", "access", newUserMysql.email, newUserMysql.password, newUserMysql.access ]);
                        
                        pool.query(query, (err, row) => {
                            if(err){

                                console.log("PASSPORT_DB_ERROR: ", err);

                                return done(null, false, {
                                    message: 'DB_ERROR'
                                })
                            }
                            newUserMysql.id = row.insertId;

                            console.log("USER_CREATED")
                            console.log(" ROW: ", newUserMysql);
                            return done(null, newUserMysql);
                        })
                    }
                });

            } catch (err){
                return done(err);
            }
        }
    )
)




passport.use(
    'registerCompany',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false
        }, 
        (req, email, password, done) => {
            try{

                console.log("using register company strategy!");
                console.log("requested_mail: ", req.body.email);

                let insertQuery = 'SELECT * FROM company_info WHERE ?? = ? ';
                let query = mysql.format(insertQuery, [ "company_email", email]);
            
                pool.query(query, (err, rows)=>{
                    if(err){
                        console.log("error_pass_while_querying:  ", err);
                        return done(err);
                    } 
                    if(rows.length){

                        console.log("COMPANY_EXIST!");
                        return done(null, false, {
                            message: 'Email already exist'
                        });

                    }else{

                        console.log("email: ", email);
                        console.log("password: ", password);
                        
                        var newUserMysql = {
                            email: email,
                            password: cryptr.encrypt(password),
                            name: req.body.company_name
                        }

                        console.log("passport_obj: ", newUserMysql);

                        let insertQuery = 'INSERT INTO ?? ( ??, ??, ??) VALUES (?, ?, ?) ';
                        let query = mysql.format( insertQuery, ["company_info", "company_email","company_psw", "company_name", newUserMysql.email, newUserMysql.password, newUserMysql.name ]);
                        
                        pool.query(query, (err, row) => {
                            if(err){

                                console.log("PASSPORT_DB_ERROR: ", err);

                                return done(null, false, {
                                    message: 'DB_ERROR'
                                })
                            }
                            
                            newUserMysql.id = row.insertId;

                            console.log("USER_CREATED")
                            console.log(" ROW: ", newUserMysql);
                            return done(null, newUserMysql);
                        })
                    }
                });

            } catch (err){
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

            let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
            let query = mysql.format(insertQuery, [ "student_email", email]);

            console.log("query: ", query);

            pool.query(query, (err, row)=>{

                console.log("inside quere response");

                    if(row.length === 0){
                        return done(null, false, {message: "Email doesn't match"})
                    }

                    console.log("USER_EXIST!");
                    console.log("CHECKING_PASSWORD!");
                    console.log("ROW_LENGTH: ", row.length);

                    const  encryptedpsw = row[0].student_password;
                    const decryptedString = cryptr.decrypt(encryptedpsw);

                    console.log("decrypted: ", decryptedString);

                    if( password === decryptedString){

                        console.log("PASSWORD_MATCHED!");
                        return done(null, row[0]);

                    }else{
                            console.log("PASSWORD_NOT_MATCHED!");
                            return done(null, false, { message: "password doesnt match"});
                    }
            });
        } catch (err) {
          return done(err);
        }
      },
    ),
  );


//login company strategy 
passport.use(
    'companyLogin',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
      },
      (email, password, done) => {
        try {

            console.log("INSIDE_COMPANY_PASS_AUTH");
            console.log("email: ", email);

            let insertQuery = 'SELECT * FROM company_info WHERE ?? = ? ';
            let query = mysql.format(insertQuery, [ "company_email", email]);

            console.log("query: ", query);

            pool.query(query, (err, row)=>{

                console.log("inside quere response");

                if(err){
                    console.log("Query_error: ", err);
                    return done(null, false, {message: "No User Exist!"});
                }

                    if(row.length === 0){
                        return done(null, false, {message: "Email doesn't match"})
                    }

                    console.log("USER_EXIST!");
                    console.log("CHECKING_PASSWORD!");
                    console.log("ROW_LENGTH: ", row.length);

                    const  encryptedpsw = row[0].company_psw;
                    const decryptedString = cryptr.decrypt(encryptedpsw);

                    console.log("decrypted: ", decryptedString);

                    if( password === decryptedString){

                        console.log("PASSWORD_MATCHED!");
                        return done(null, row[0]);

                    }else{
                            console.log("PASSWORD_NOT_MATCHED!");
                            return done(null, false, { message: "password doesnt match"});
                    }
            });
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
            let insertquery = 'SELECT * FROM students WHERE ?? = ?';
            let query = mysql.format(insertquery, ["student_email", jwt_payload.id]);

            pool.query(query, (err, rows) => {
                if(err){
                    console.log("DB_ERROR: ", err);
                }

                if(rows.length > 0){
                    console.log('PASSPORT_USER_EXIST');
                    done(null,  rows[0]);
                }else{
                    console.log("USER_DOESNT_EXIST");
                    // console.log("Result_got: ", rows[0].length);
                    done(null, false, {message: "user doesnt not exist"});
                }
            })  
        } catch (err){
            console.log("jwt_error:", err)
            done(err);
        }
    })
);



const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
  };

passport.use(
    'jwtcompany',
    new JWTstrategy(options, (jwt_payload, done) => {
        console.log("USING_JWT_COMPANY_STRATEGY");
        try{
            console.log("JWT_ID: ", jwt_payload.id);
            let insertquery = 'SELECT * FROM company_info WHERE ?? = ?';
            let query = mysql.format(insertquery, ["company_email", jwt_payload.id]);

            pool.query(query, (err, rows) => {
                if(err){
                    console.log("DB_ERROR: ", err);
                }

                if(rows.length > 0){
                    console.log('PASSPORT_USER_EXIST');
                    done(null,  rows[0]);
                }else{
                    console.log("USER_NOT_EXIST");
                    // console.log("Result_got: ", rows[0].length);
                    done(null, false, {message: "user doesnt not exist"});
                }
            })  
        } catch (err){
            console.log("jwt_error:", err)
            done(err);
        }
    })
);