const passport = require('passport'); 
var mongoose = require('mongoose');
const User = require('../models/userModel');
var kafka = require('../kafka/client');

module.exports = app =>{
        app.post('/addEduExp', (req, res, next) =>{
            passport.authenticate('jwt', {session: false}, (err, user, info) =>{
                    if(err){
                        console.log("error while authenticating! ", err);
                        res.status(400).end();
                    }
                    if(info !== undefined){
                        console.log("addEduExp_error_msg: ", info.message);
                        res.json({error: info.message})
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

                            let update_query = {
                                $push : 
                                    {
                                        'education': eduObj
                                    }
                            }

                            let options = {
                                upsert: true, 
                                new: true,
                                useFindAndModify: false,
                            }

                            let emailObj ={
                                email: email
                            }

                            educationObject = new Object()
                            educationObject.options = options,
                            educationObject.update_query = update_query
                            educationObject.email = emailObj

                            kafka.make_request('add_education',educationObject, (error, result)=>{
                                console.log("response after make_request")
                                if(error){
                                    console.log("error: ", error)
                                    res.status(400).send({error: "kafka make_request error"})
                                }

                                console.log('add edu result - ', result)

                                res.json(result)
                               
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
                                    location : reqObj.location,
                                    company_name : reqObj.company_name,
                                    joined_date : reqObj.joined_date,
                                    description : reqObj.description,
                                }
                            }

                            let options = {
                                upsert: true, 
                                new: true,
                                useFindAndModify: false,
                            }

                            let update_query = {
                                $push:
                                    {
                                        "experience": expObj
                                    }
                            }

                            let emailObj = {
                                email: email
                            }

                            experienceObject = new Object()
                            experienceObject.options = options,
                            experienceObject.update_query = update_query
                            experienceObject.email = emailObj

                            kafka.make_request('add_experience', experienceObject, (error, result)=>{
                                console.log("response after make_request")
                                if(error){
                                    console.log("error: ", error)
                                    res.status(400).send({error: "Error while adding experience"})
                                }

                                res.json(result)
                               
                            })

                        }else{
                            console.log("INCORRECT_EXP_EDU_DETAILS!");
                            res.status(404).end();
                        }
                    }
                })(req, res, next);
        });
}