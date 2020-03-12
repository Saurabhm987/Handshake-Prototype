const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
        app.post('/applyJob', (req, res, next)=>{

            console.log("INSIDE_APPLY_JOB");

            passport.authenticate('jwt', (err, user, info) => {

            if(err){
                console.log("post_job_after_passport_error: ", err);
            }

            console.log("NO_DB_ERROR!");

            if(info !== undefined){
                console.log("postJob_info_message: ", info.message);
                res.status(200).send({
                    message: info.message
                });

            }else{

                if(req.body.params === ""){
                    console.log("No parameters sent !!", req.body);
                    return  res.status(400).end();
                }

                console.log("apply job!!!!!");
                console.log("user: ", user.student_email);
                console.log("applied_job_details: ", req.body.params);

                let job_status = "Applied";
                let student_email =  user.student_email;
                let job_id = req.body.params.id;
                let company_name = req.body.params.company; 
                let job_title = req.body.params.job_title;
                let profile_pic = req.body.params.profile_pic;

                    let insertQuery = 'INSERT INTO applied_job (??,??,??,??,??, ??)  VALUES (?,?,?,?,?,?)';
                    let query = mysql.format(insertQuery, ["job_status", "student_email","job_id", "company_name", "job_title", "profile_pic", job_status, student_email, job_id, company_name, job_title, profile_pic]);
                      
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
