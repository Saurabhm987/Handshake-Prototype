const passport = require('passport'); 
const User = require('../models/userModel');
var kafka = require('../kafka/client');

module.exports = app => {
    app.get('/getJobBoard/:requestInfo', (req, res, next) => {
        console.log(`Get - jobboard`)
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }

            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.email !== null){
                if(req.params.requestInfo === "board"){
                    //kafka request 
                    const access = "company"
                    kafka.make_request('fetch_job_board',access, (error, result)=>{
                        console.log("response after make_request")
                        if(error){
                            console.log("error: ", error)
                            res.status(400).send({error: "kafka make_request error"})
                        }
                        console.log("Final response: ")
                        console.log( "__________________Job Board Reponse ___________________", result)
                        res.json(result)
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
