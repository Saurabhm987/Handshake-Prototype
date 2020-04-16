const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app =>{
    app.get("/profileStudent/:requestInfo", (req, res, next)  => {
        passport.authenticate('jwt', {session: false}, (err, user, info) => { 
        console.log("req params:", req.params);
        console.log("req_query: ", req.query);
          if(err){
              console.log("ERROR:" , err);
              res.status(400).send({message:"error"});
          }

          if(info !== undefined){
            console.log("ERROR_MESSGE",   info.message);
            res.status(200).send(info.message);

          }else if(user.email !== ""){
            if(req.params.requestInfo === 'userInfo'){
                const email = req.query.email
                let result_Query = {
                    profileInfo: 1, 
                    name:1,
                    college:1, 
                    _id: 0
                }
                User.findOne(
                    {email: email},
                    result_Query
                    )
                    .exec()
                    .then( response => {
                        console.log(`response : ${response}`)
                        const {name, college, profileInfo} = response
                        const { degree, gpa, grad_date, major, summary, profile_pic, resume} = profileInfo.toObject()
                        let data = new Object()
                        data.name = name
                        data.college = college
                        data.degree = degree
                        data.gpa = gpa
                        data.grad_date = grad_date
                        data.major = major
                        data.summary = summary
                        data.profile_pic = profile_pic
                        data.resume = resume
                        res.json(data)
                    })
                    .catch( error => {
                        console.log(`error : ${error}`)
                        res.json({error: 'error while processing request'})
                    })

                }else if(req.params.requestInfo === 'expInfo'){
                    const email = req.query.email
                    User.findOne(
                        {email: email},
                        {"experience": 1, _id: 0}
                    )
                    .exec()
                    .then(response=>{
                        if(response){
                            console.log(`exp response - ${response}`)
                            const data = response.toObject()
                            const result = data.experience
                            console.log(`expt sent to client - ${JSON.stringify(result)}`)
                            res.json(result)
                        }else{
                            res.status(400).end()
                        }
                    })
                    .catch(err=>{
                        console.log("err: ", err);
                        res.status(400).end();
                    })

                }else if(req.params.requestInfo === 'eduInfo'){
                    const email = req.query.email
                    console.log("email: ", email)
                    User.findOne(
                        {email:email},
                        {"education": 1, _id: 0},
                        (err, response)=>{
                            if(err){
                                console.log("err: ", err);
                            }
                            console.log('edu response - ', response)
                            const data = response.toObject();
                            const result = data.education;
                            console.log(`edu response sent to client - ${result}`)
                            res.json(result);
                        }
                    )
                }
            }else{
                console.log("TOKEN_DOESNT_MATCH");
                res.status(200).send({
                    message: "UNAUTHORIZED"
                })
            }
        })(req, res, next);
    })
}
