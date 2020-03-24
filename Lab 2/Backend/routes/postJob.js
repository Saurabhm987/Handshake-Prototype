const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app =>{
        app.post('/postJob', (req, res, next)=>{
            console.log("INSIDE_POST_JOB");
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

                console.log("inside post job!!!!!");
    
                if(req.body.job_title === ""){
                    console.log("No requested body !!", req.body);
                    return  res.status(400).end();
                }
                    const req_body = Object.assign(req.body.params.data);

                    console.log("Job_posting_details:  ", req_body);
                    const email = user.email;

                    User.updateOne(  
                        { email: email }, 
                        { $push: {"postedJob": {
                            title: req_body.job_title,
                            location: req_body.job_loc,
                            salary: req_body.job_salary,
                            postedDate: new Date(),
                            description: req_body.job_descr,
                            name: req_body.company_name,
                            // profile_pic: req_body.profile_pic
                        }}},
                        {upsert: true}, 
                        function(err, user){
                            if(err){
                                console.log("error while inserting!", err);
                                res.status(200).send({
                                    message: "Error While Posting Job!"
                                })
                            }
                            console.log("record updated ! ");
                            res.status(200).send({
                                message: "Job Posted!"
                            })
                }) 
            }
             })(req, res, next);
        })
}