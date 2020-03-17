const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');


module.exports = app => {
    app.get('/getJobPosted/:requestInfo', (req, res, next) => {
        console.log("GETTING_JOB_POSTED");
        console.log("CALLING_PASS_AUTH");
        passport.authenticate('jwtcompany',{session: false}, (err, user, info) => {
            console.log("checking pass errors..");

            if(err){
                console.log("errors while authenticating", err);
            }

            console.log("getJobPosted_req_body: ", req.body);

            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.company_email !== null){
                
                if(req.params.requestInfo === "postedjob"){

                let jobPosted = new Object();

                let insertQuery = 'SELECT * FROM job_post WHERE company_name = ?';
                let query = mysql.format(insertQuery, [user.company_name]);

                pool.query(query, (err, rows) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }
                    console.log("getJobPosted_NO_QUERY_ERROR!");
                    console.log("-----------------rendered job info ---------------------------")

                    jobPosted = Object.assign(rows);

                    console.log("job posted..",jobPosted);

                    res.json(jobPosted);
                })

            }else if( req.params.requestInfo === "postedevent"){

                let eventPosted = new Object();

                let insertQuery = 'SELECT * FROM event_info WHERE company_name = ?';
                let query = mysql.format(insertQuery, [user.company_name]);

                pool.query(query, (err, rows) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }
                    console.log("getJobPosted_NO_QUERY_ERROR!");
                    console.log("-----------------rendered job info ---------------------------")

                    eventPosted = Object.assign(rows);

                    console.log("Posted Event.",eventPosted);

                    res.json(eventPosted);
                })

            }else{
                console.log("no parameters provided!!");
            }
            }
        })(req, res, next);
    })
}

