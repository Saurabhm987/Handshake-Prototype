const passport = require('passport'); 
const User = require("../models/userModel");
var kafka = require('../kafka/client');

module.exports = app => {
    app.get('/getEventBoard/:requestInfo', (req, res, next) => {
        console.log("event_board");
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }
            console.log("getEventBoard_req_body: ", req.body.params);
            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.email !== null){
                if(req.params.requestInfo === "board"){

                    kafka.make_request('fetch_event_board', null, (error, result)=>{
                        console.log("response after make_request")
                        if(error){
                            console.log("error: ", error)
                            res.json({error : 'Erro while fetching Event'})
                        }
                        res.json(result)
                    })
                    
            }else if(req.params.requestInfo === "appliedevents"){
                const email = user.email

                let find_query = {
                    email : email
                }

                kafka.make_request('applied_event', find_query, (error, result)=>{
                    console.log("response after make_request")
                    if(error){
                        console.log("error: ", error)
                        res.json({error : 'Erro while fetching Event'})
                    }
                    console.log('applied event - ', result)
                    res.json(result)
                })

            }else {
                console.log("No parameters recieved !");
                res.end();
            }
            }
        })(req, res, next);
    })
}

