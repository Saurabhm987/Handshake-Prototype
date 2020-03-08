const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app => {
    app.get("/getJobItem", (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
                if(err){
                    console.log("pass_error: ", err);
                }
                console.log("getJobItem_req_body: ", req.body.params);

                if(info !== undefined){

                    console.log("checking error msg from passport.." , info.message);
                    res.status(200).send(info.message);
                    
                }else if(req.body !== undefined && user.student_email !== null){

                if(req.body.params.type === "getJob"){
                
                console.log("inside_get_job_item...");
                console.log("req_body: ", req.body);
                let jobPosted = new Object();
                let job_id = req.body.params.job_id;
                let insertQuery = 'SELECT * FROM job_post WHERE job_id = ?';
                let query = mysql.format(insertQuery, [job_id]);

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
            }else{
                console.log("no_parameters_passed");
            }
            }else{
                console.log("request_body_absent!");
            }
        })(req, res, next);
    })
}