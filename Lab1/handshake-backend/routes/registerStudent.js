const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

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
                
               /* The callback can use the arguments supplied to handle the 
                authentication result as desired. Note that when using a custom 
                callback, it becomes the application's responsibility to establish
                 a session (by calling req.login()) and send a response. */

                req.logIn(user, error => {

                    console.log("USER: ", user);
                    const email =  user.email;
                    console.log("PASSPORT_EMAIL: ", email);

                    const reqData = {
                        student_name : req.body.name,
                        student_college_name: req.body.uniName,
                    }

                    console.log("REQ_DATA: ", reqData);

                    let insertQuery = 'UPDATE students SET ? WHERE student_email = ?';
                    let query = mysql.format(insertQuery, [reqData, email]);

                    pool.query(query, (err, row) =>{
                        if(err){
                            console.log("QUERY_ERROR ", err);
                        }else{
                            console.log("QUERY_SUCCESS! USER_CREATED!", row);
                            res.status(200).send({message: 'user created'});
                        }
                    })
                })
            }
        })(req, res, next);
    });
}