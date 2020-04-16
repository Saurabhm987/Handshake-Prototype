const passport = require('passport'); 
var kafka = require('../kafka/client');

module.exports = app => {
    app.get('/getDetails', (req, res, next) => {
        console.log('hitting')
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }

            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.email !== null){
                if(req.query.info === "getEventDetails"){
                    const _id = req.query.event_id;

                    let request = new Object()

                    request.email = user.email
                    request._id = _id

                    kafka.make_request('get_event_detail',request, (error, result)=>{
                        console.log("response after make_request")
                        if(error){
                            console.log("error: ", error)
                            res.status(400).send({error: "kafka make_request error"})
                        }
                        res.json(result[0])
                    })

                }else if(req.query.info === "appliedJob"){  
                    const email = user.email
                    
                    kafka.make_request('get_applications',email, (error, result)=>{
                        console.log("response after make_request")
                        if(error){
                            console.log("error: ", error)
                            res.status(400).send({error: "kafka make_request error"})
                        }
                        console.log('update education result - ', result)
                        res.json(result)
                    })
                }
            }
        })(req, res, next);
    });
}