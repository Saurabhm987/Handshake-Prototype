const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app => {
    app.get('/getJobBoard/:requestInfo', (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }
            // console.log("getJobBoard_req_body: ", req.body.params);

            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.email !== null){
                if(req.params.requestInfo === "board"){
                    User.find({access: "company"}, {postedJob: 1, _id: 0}, (err, result)=> {
                        if(err){
                            console.log('error: ', err);
                        }
                        // console.log("result: ", result);
                        let postedResult = [];
                        result.forEach( jobs =>{
                               postedResult = [...postedResult ,...jobs.postedJob]
                        })
                        res.json(postedResult);
                    })
            }else if(req.params.requestInfo === "applications"){
                User.findOne({ }, {appliedJob: 1}, (err, result)=> {
                    if(err){
                        res.status(400).end({message: "Bad Request!"});
                    }
                    res.status(200).json(result.appliedJob);
                })
             }
            }
        })(req, res, next);
    })
}



                    // User.find({ }, {postedJob: 1, _id:0}, function(err, result){
                    //     if(err){
                    //         console.log('err: ', err);
                    //     }
                    //     let postedResult = [];
                    //     result.forEach( postedJob =>{
                    //             postedResult.push(Object.values(postedJob.postedJob));
                    //     })
                    //     let jobsPost = {};
                    //     jobsPost = postedResult.filter((jobs)=>{
                    //          return jobs.length>0;
                    //     })
                    //     var merged = [].concat.apply([], jobsPost);
                    //     res.status(200).json(merged);
                    // })