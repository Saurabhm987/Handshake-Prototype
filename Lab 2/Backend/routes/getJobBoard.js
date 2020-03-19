const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');


module.exports = app => {
    app.get('/getJobBoard/:requestInfo', (req, res, next) => {
        console.log("GETTING_JOB_DASHBOARD");
        console.log("CALLING_PASS_AUTH");

        /*
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            console.log("checking pass errors..");

            if(err){
                console.log("errors while authenticating", err);
            }

            console.log("getJobBoard_req_body: ", req.body.params);


            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.student_email !== null){

                if(req.params.requestInfo === "board"){

                let jobPosted = new Object();

                let insertQuery = 'SELECT * FROM job_post';
                let query = mysql.format(insertQuery);

                pool.query(query, (err, rows, field) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }
                    console.log("profileStudent_NO_QUERY_ERROR!");
                    console.log("-----------------rendered student info ---------------------------")

                    jobPosted = Object.assign(rows);

                    console.log("job posted..",jobPosted);

                    res.json(jobPosted);
                })


            }else if(req.params.requestInfo === "applications"){

                let jobApplied = new Object();

                student_email = user.student_email;

                let insertQuery = 'SELECT * FROM applied_job WHERE student_email = ?';
                let query = mysql.format(insertQuery, [student_email]);

                pool.query(query, (err, rows) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }
                    console.log("profileStudent_NO_QUERY_ERROR!");
                    console.log("-----------------rendered student info ---------------------------")

                    jobApplied = Object.assign(rows);

                    console.log("job posted..",jobApplied);

                    res.json(jobApplied);
                })

            }
            }
        })(req, res, next);
        */

        res.status(200).send({
            message: "Getting Job Board"
        })

    })
}

