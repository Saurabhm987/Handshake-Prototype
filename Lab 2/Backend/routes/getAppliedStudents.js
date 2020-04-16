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
            if(req.query.requestInfo === "event"){

                const email = user.email

                User.find(
                    {"email":email},
                    {"studentAppliedEvent" : 1, _id: 0}
                )
                .exec()
                .then( response => {
                    console.log('response - ', response)
                    if(response[0].studentAppliedEvent){
                        res.json(response[0].studentAppliedEvent)
                    }else{
                        res.end()
                    }
                })
            }else{

                const email = user.email;
                User.find(
                    {email: email},
                    {'studentAppliedJob': 1, _id: 0}
                )
                .exec()
                .then( response => {
                    if(response[0].studentAppliedJob){
                        console.log(response[0].studentAppliedJob)
                        res.json(response[0].studentAppliedJob)
                    }else{
                        res.end()
                    }
                })
                .catch( error => {
                    console.log('error - ', error)
                    res.end()
                })
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



                            // [    
                            //     {
                            //         $project : {
                            //             appliedJob: {
                            //                 $filter : {
                            //                     input: "$appliedJob",
                            //                     as: "job",
                            //                     cond: {$eq : ["$$job.name", name]}
                            //                 }
                            //             }
                            //         }
                            //     }
                            // ]