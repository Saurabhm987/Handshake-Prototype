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

            let companyInfo = {
                company_name: "",
                company_loc: "",
                company_descr: "",
                company_contact: " ", 
                profile_pic: "",
            };

            if(req.params.requestInfo === 'companyInfo'){

                const email = req.query.email

                User.findOne(
                    {email: email},
                    {description:1,location:1, name: 1, "profileInfo.profile_pic":1,contact:1,email: 1,  _id: 0}
                )
                .exec()
                .then( response => {
                    console.log('profileInfo - ', response)
                    response = response.toObject()
                    if(response.profileInfo){
                        const profile_pic= response.profileInfo.profile_pic
                        response.profile_pic = profile_pic
                    }
                    delete response.profileInfo
                    res.json(response)
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

















                // else if(req.params.requestInfo === 'eduInfo'){
                //     console.log("getting eduinfo.....")
                //     let insertQuery2 = 'SELECT * FROM education_details WHERE ?? = ? ';
                //     let query2 = mysql.format(insertQuery2, [ "company_email",user.company_email ]);
                //     pool.query(query2, (err, rows) =>{
                //         if(err){
                //             console.log("QUERY_ERROR: ", err);
                //             res.status(200).send({
                //                 message: "DB_ERROR!"
                //             })
                //         }
                //         console.log("profileStudent_fetched_eduInfo");
                //         console.log("profileStudent_SENDING_EDU_INFO................");
                //         console.log("_______________________________________");
                //         res.json(rows);
                //     })  
                // }