const passport = require('passport'); 
const User = require("../models/userModel");

module.exports = app => {
    app.get('/getJobPosted/:requestInfo', (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }
            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(400).send(info.message);
                
            }else if(user.email !== null){
                if(req.params.requestInfo === "postedjob"){
                    User.find( 
                        { email : user.email},
                        {postedJob: 1, profile_pic: 1, _id:0}
                    )
                    .exec()
                    .then(response => {
                        if(response[0].postedJob){
                            response = response[0].postedJob,
                            res.json(response)
                        }else{
                            res.end()
                        }
                    })
                    .catch( error => {
                        console.log(`error : ${error}`)
                        res.json({error : 'Error while getting posted job'})
                    })

                 }else if( req.params.requestInfo === "postedevent"){
                    User.find(

                        {email: user.email}, {postedEvent: 1, _id:0},
                        function(err, result){
                            if(err){
                                console.log("err: ", err)
                                res.status(400).send({msg: "Bad request"})
                            }
                            result = result[0].postedEvent;
                            console.log(result);
                            res.json(result);
                        }
                    )

            }else{
                console.log("no parameters provided!!");
            }
            }
        })(req, res, next);
    })
}

