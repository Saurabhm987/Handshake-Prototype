const passport = require('passport')
const User = require('../models/userModel')

module.exports = app => {
    app.get("/getStudents", (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
                if(err){
                    console.log("passport_error: ", err);
                }
                if(info !== undefined){
                    console.log("Info_error" , info.message);
                    res.status(200).send(info.message);
                }else if( user.email !== null){
                    User.find(
                        {access: "student"},
                        {name: 1, college: 1,email:1},
                        (err, result)=> {
                            if(err){
                                console.log("err: ", err)
                            }
                            console.log("student_result: ", result)
                            res.json(result);
                        }
                    )
            }
            else{
                console.log("request_body_absent!");
            }
        })(req, res, next);
    })
}