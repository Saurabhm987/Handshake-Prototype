const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app => {
    app.get('/getJobAppliedStudents', (req, res, next) => {
        console.log("getJobAppliedStudents");
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("err: ", err)
                res.status(400).end({msg:  "error"})
            }
            if(info !== undefined){
                console.log("info: ", info.message)
                res.status(400).end(info.message)
            }
            console.log("requested Details:  ", req.query);
            if(req.query.requestInfo === "event"){
                const company_name = user.name
                User.find(
                    {"appliedEvent.company_name":company_name},
                    (err, result)=>{
                        if(err){
                            res.status(400).end({msg: "error"})
                        }
                        // console.log("result: ", result);
                        // if(result[0].length === null){
                        //     let applied_event = result.filter( event =>{
                        //         return Object.values(event.appliedEvent).length>0
                        //     })
                        //     let event_details = applied_event[0].appliedEvent.filter( event=>{
                        //         return event.company_name = company_name
                        //     })  
                        //     res.json(event_details)
                        // }else{
                        //     res.status(400).send("error")
                        // }
                        res.end()
                    }
                )
            }else{
                const company_name = user.name;
                User.find(
                    {"appliedJob.company_name":company_name},
                    (err, result)=>{
                        if(err){
                            console.log("err: ", err);
                            res.status(400).send({msg: "Bad request"});
                        }
                        if(result){
                            const data = result[0].appliedJob;
                            let job = data.filter(name => {
                                return name.company_name === company_name;
                            })
                            res.json(job);
                        }else{
                            res.status(400).end({msg: "No Job Posted"});
                        }
                    }
                )
            }
        })(req, res, next);
    });
}

                  // {access: "student"},
                    // {appliedJob: 1, _id: 0},
                   // let applied_job = result.filter( job => {
                            //     return Object.values(job.appliedJob).length>0
                            // })
                            // let data = applied_job[0].appliedJob;
                            // console.log("data: ", data);
                            // let job = data.filter(name => {
                            //     return name.company_name === company_name;
                            // })
                            // res.json(job);