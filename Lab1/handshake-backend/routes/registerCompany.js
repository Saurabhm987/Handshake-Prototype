const jwt = require ('jsonwebtoken' );
const passport = require('passport'); 
const  jwtSecret  = require( '../config/jwtConfig');
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app => {
    app.post('/registerCompany', (req, res, next )=>{

        console.log("requested_details_before_auth: ", req.body);

        passport.authenticate('registerCompany', (err, user, info) => {
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

                    let reqObj = new Object();

                    reqObj.company_loc = req.body.company_loc;
                    reqObj.company_descr = req.body.company_descr;
                    reqObj.company_contact = req.body.company_contact;

                    console.log("REQ_DATA: ", reqObj);

                    let insertQuery = 'UPDATE company_info SET ? WHERE company_email = ?';
                    let query = mysql.format(insertQuery, [reqObj, email]);

                    pool.query(query, (err, row) =>{
                        if(err){
                            console.log("QUERY_ERROR ", err);
                        }else{
                            console.log("QUERY_SUCCESS! USER_CREATED!", row);
                            let company_name = req.body.company_name
                            res.status(200).send({company_name: company_name});
                        }
                    })
                })
            }
        })(req, res, next);
    });
}