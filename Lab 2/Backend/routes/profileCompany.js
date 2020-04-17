const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app =>{
    app.get("/profileCompany/:requestInfo", (req, res, next)  => {
        passport.authenticate('jwt', {session: false}, (err, user, info) => { 
          if(err){
              console.log("ERROR:" , err);
          }
          
          if(info !== undefined){
            console.log("ERROR_MESSGE",   info.message);
            res.status(200).send(info.message);

          }else if(user.email !== ""){
            if(req.params.requestInfo === 'companyInfo'){
                const email = req.query.email

                User.findOne(
                    {email: email},
                    {"profileInfo":1,email: 1,  _id: 0}
                )
                .exec()
                .then( response => {
                    console.log('profileInfo - ', response)
                    response = response.toObject()

                    let result = response.profileInfo
                    result.email = response.email

                    console.log('result - ', result)

                    // if(response.profileInfo){
                    //     const profile_pic= response.profileInfo.profile_pic
                    //     response.profile_pic = profile_pic
                    // }
                    // delete response.email    
                    // res.end()
                    res.json(result)
                })
                .catch( error => {
                    console.log(`company profile error - ${error}`)
                    res.end()
                })
                }
                else{
                    console.log("NO_PARAMETERS_SPECIFIED");
                    req.status(200).send({
                        message : "NO PARAMETERS"
                    })
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

