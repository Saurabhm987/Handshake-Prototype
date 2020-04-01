const passport = require('passport'); 
var mongoose = require('mongoose');
const User = require('../models/userModel');

module.exports = app =>{
        app.post('/addEduExp', (req, res, next) =>{
            passport.authenticate('jwt', {session: false}, (err, user, info) =>{
                    if(err){
                        console.log("error while authenticating! ", err);
                        res.status(400).end();
                    }
                    if(info !== undefined){
                        console.log("addEduExp_error_msg: ", info.message);
                        res.status(200).send({
                            message: "Error_auth_cant_add_info"
                        })
                    }else{
                        if(req.body.params.requestInfo === "EDU"){
                            let reqObj = req.body.params.data;
                            let email = user.email;
                            let _id = mongoose.Types.ObjectId().toString();
                            let eduObj = {
                                education_id: _id,
                                education_details:{
                                    college: reqObj.college	,
                                    location : reqObj.location,
                                    degree : reqObj.degree,
                                    major : reqObj.major,
                                    yop : reqObj.yop,
                                    gpa	 : reqObj.gpa,
                                }
                            }
                            console.log("education_obje: ", eduObj);
                            User.updateOne(
                                {email: email},
                                {$push:{
                                        "education": eduObj
                                    }
                                },
                                {upsert: true}
                            ).then( response =>{
                                console.log("response: ", response);
                                res.status(200).send({message:"Added education!"});
                            }).catch ( err =>{
                                console.log("err: ", err);
                                res.status(400).end();
                            })

                        }else if(req.body.params.requestInfo === "EXP"){
                            console.log("POSTING_STUDENT_EXP");
                            let reqObj = req.body.params.data;
                            let email = user.email;
                            let _id = mongoose.Types.ObjectId().toString();

                            let expObj = {
                                experience_id: _id,
                                experience_details:{
                                    title: reqObj.title	,
                                    position : reqObj.position,
                                    company_name : reqObj.company_name,
                                    joined_date : reqObj.joined_date,
                                    description : reqObj.description,
                                }
                            }

                            User.updateOne(
                                {email: email},
                                {$push:{
                                        "experience": expObj
                                    }
                                },
                                {upsert: true}
                            ).then( response =>{
                                console.log("response: ", response);
                                res.status(200).send({message: "added experience"})
                            }).catch ( err =>{
                                console.log("err: ", err);
                                res.status(400).end();
                            })

                        }else{
                            console.log("INCORRECT_EXP_EDU_DETAILS!");
                            res.status(404).end();
                        }
                    }
                })(req, res, next);
        });
}