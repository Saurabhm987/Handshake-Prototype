const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
        app.post('/applyEvent', (req, res, next)=>{

            console.log("INSIDE_APPLY_JOB");

            passport.authenticate('jwt', (err, user, info) => {

            if(err){
                console.log("post_job_after_passport_error: ", err);
            }

            console.log("NO_DB_ERROR!");

            if(info !== undefined){
                console.log("pass_info_message: ", info.message);
                res.status(200).send({
                    message: info.message
                });

            }else{

                if(req.body.params === ""){
                    console.log("No parameters sent !!", req.body);
                    return  res.status(400).end();
                }

                console.log("apply event!!!!!");
                console.log("user: ", user.student_email);
                console.log("applied_event_details: ", req.body.params);


                let student_email =  user.student_email;
                let event_id = req.body.params.event_id;
                let event_name = req.body.params.event_name; 
                let company_name = req.body.params.company_name; 
                let event_status = req.body.params.event_status;
                let profile_pic = req.body.params.profile_pic;
                let event_loc = req.body.params.event_loc;

                let insertQuery = 'INSERT INTO applied_event (??, ??, ??, ??, ??, ??, ??)  VALUES (?, ?, ?, ?, ?, ?, ?)';
                let query = mysql.format(insertQuery, ["event_id", "student_email","company_name", "event_status", "profile_pic", "event_name", "event_loc", event_id, student_email, company_name, event_status, profile_pic, event_name, event_loc]);

                    pool.query(query, (err, response) =>{
                        if(err){
                            console.log("Post job error : ", err);
                            return res.status(400).end("QUERY_ERROR");
                        }else{
                            console.log("successfully applied to job!!");
                        }
                    })
                    res.status(200).send({
                        message: "success!"
                    });
            }
             })(req, res, next);
        })
}
