const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app =>{
    app.get("/profileStudent/:requestInfo", (req, res, next)  => {
        passport.authenticate('jwt', {session: false}, (err, user, info) => { 
        console.log("req params:", req.params);
          if(err){
              console.log("ERROR:" , err);
              res.status(400).send({message:"error"});
          }

          if(info !== undefined){
            console.log("ERROR_MESSGE",   info.message);
            res.status(200).send(info.message);

          }else if(user.email !== ""){
            if(req.params.requestInfo === 'userInfo'){
                console.log("hitting UserInof!!!");
                const email = user.email

                User.findOne(
                    {email: email},
                    {profileInfo: 1, name:1,college:1, _id: 0},
                    (err, result)=>{
                        if(err){
                            console.log("err:", err);
                        }
                        console.log("result:", result);
                        result = result.toObject();
                        let data = new Object();
                        data.name = result.name
                        data.college = result.college
                        data.degree = result.profileInfo.degree
                        data.gpa = result.profileInfo.gpa
                        data.grad_date = result.profileInfo.grad_date
                        data.major = result.profileInfo.major
                        data.summary = result.profileInfo.summary
                        console.log("data; ", data);
                        res.json(data)
                    })
                }else if(req.params.requestInfo === 'expInfo'){
                    const email = user.email
                    User.findOne(
                        {email: email},
                        {"experience": 1, _id: 0}
                    )
                    .then(response=>{
                        console.log("expInfo: ", response)
                        const data = response.toObject();
                        const result = data.experience;
                        res.json(result);
                    })
                    .catch(err=>{
                        console.log("err: ", err);
                        res.status(400).end();
                    })

                }else if(req.params.requestInfo === 'eduInfo'){
                    const email = user.email
                    User.findOne(
                        {email:email},
                        {"education": 1, _id: 0},
                        (err, response)=>{
                            if(err){
                                console.log("err: ", err);
                            }
                            const data = response.toObject();
                            const result = data.education;
                            console.log("GET_edu_result:", result);
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
