const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');
const User = require('../models/userModel');

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

                appliedDetails = new Object();

                appliedDetails.status = "Applied";
                appliedDetails.job_id = req.body.params.id;
                appliedDetails.company_name = req.body.params.company; 
                appliedDetails.job_title = req.body.params.title;
                appliedDetails.profile_pic = req.body.params.profile_pic;
                appliedDetails.appliedDate = new Date();

                const email = user.email;

                    User.updateOne(  
                        { email: email }, 
                        { $push: {"appliedJob": appliedDetails}},
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
