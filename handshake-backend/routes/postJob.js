const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
        app.post('/postJob', (req, res, next)=>{

            console.log("INSIDE_POST_JOB");

            passport.authenticate('jwtcompany', (err, user, info) => {

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

                console.log("inside post job!!!!!");
    
                if(req.body.job_title === ""){
                    console.log("No requested body !!", req.body);
                    return  res.status(400).end();
                }
                console.log("requested body :", req.body );

                    const req_body = Object.assign(req.body.params.data);
                    console.log("copy_object: ", req_body);
                    delete req_body.token;
                    console.log("final_ass_object", req_body);

                    console.log("user_email:", user.company_email);

                    let insertQuery = 'INSERT INTO job_post (??,??,??,??,??,??)  VALUES (?,?,?,?,?,?)';
                    let query = mysql.format(insertQuery, ["job_title", "job_loc","job_salary", "job_post_date", "job_descr", "company_name",req_body. job_title, req_body.job_loc, req_body.job_salary, req_body.job_post_date, req_body.job_descr, req_body.company_name ]);
                    
                    pool.query(query, (err, response) =>{
                        if(err){
                            console.log("Post job error : ", err);
                            return res.status(400).end("QUERY_ERROR");
                        }else{
                            console.log("successfully posted job!!");
                        }
                    })
                    res.status(200).send({
                        message: "success!"
                    });
            }
             })(req, res, next);
        })
}