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
                    {profileInfo: 1, _id: 0},
                    (err, result)=>{
                        if(err){
                            console.log("err:", errr);
                        }
                        res.json(result.profileInfo);
                    }
                )

                            // let userInfo = {
            //     student_name: "",
            //     student_college_name: "",
            //     degree: "",
            //     grad_date: " ", 
            //     gpa: "",
            //     major: ""
            // };
                // let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
                // let query = mysql.format(insertQuery, [ "student_email", user.student_email]);
                // pool.query(query, (err, rows, field) =>{
                //     if(err){
                //         console.log("QUERY_ERROR: ", err);
                //         res.status(200).send({
                //             message: "DB_ERROR"
                //         });
                //     }
                //     delete rows[0].student_password;
                //     userInfo.student_name = rows[0].student_name;
                //     userInfo.student_college_name = rows[0].student_college_name;
                //     userInfo.degree = rows[0].degree;
                //     userInfo.major = rows[0].major;
                //     userInfo. gpa = rows[0].gpa;
                //     userInfo.grad_date = rows[0].grad_date;
                //     userInfo.student_objective = rows[0].student_objective;
                //     userInfo.profile_pic = rows[0].profile_pic;
                //     res.json(userInfo);
                // })

                }else if(req.params.requestInfo === 'expInfo'){
                    
                    User.findOne(
                        {email: email},
                        {experience: 1, _id: 0},
                        (err, result)=>{
                            if(err){
                                console.log("err:", err);
                            }
                            console.log("result-expInfo  ",  result);
                            res.end();
                        }
                    )
                    // console.log("geting expinfo........")
                    // let insertQuery1 = 'SELECT * FROM experience_details WHERE ?? = ? ';
                    // let query1 = mysql.format(insertQuery1, [ "student_email", user.student_email ]);
                    // pool.query(query1, (err, rows) =>{
                    //     if(err){
                    //         console.log("QUERY_ERROR: ", err);
                    //         res.status(200).send({
                    //             message: "Q_ERROR"
                    //         });
                    //     }
                    //     console.log("fetched expinfo!");            
                    //     console.log('sending back to client.....');
                    //     console.log("_______________________________________");
                    //     res.json(rows);
                    // })

                }else if(req.params.requestInfo === 'eduInfo'){

                    // console.log("getting eduinfo.....")
                    // let insertQuery2 = 'SELECT * FROM education_details WHERE ?? = ? ';
                    // let query2 = mysql.format(insertQuery2, [ "student_email",user.student_email ]);
                    // pool.query(query2, (err, rows) =>{
                    //     if(err){
                    //         console.log("QUERY_ERROR: ", err);
                            
                    //         res.status(200).send({
                    //             message: "DB_ERROR!"
                    //         })
                    //     }
                    //     console.log("profileStudent_fetched_eduInfo");
                    //     console.log("profileStudent_SENDING_EDU_INFO................");
                    //     console.log("_______________________________________");
                    //     res.json(rows);
                    // })  
                    // res.end()
                }else if(req.params.requestInfo === 'summary'){


                // let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
                // let query = mysql.format(insertQuery, [ "student_email", user.student_email]);
                // pool.query(query, (err, rows, field) =>{
                //     if(err){
                //         console.log("QUERY_ERROR: ", err);
                //         res.status(200).send({
                //             message: "DB_ERROR"
                //         });
                //     }
                //     console.log("profileStudent_NO_QUERY_ERROR!");
                //     delete rows[0].student_password;
                //     userInfo.student_name = rows[0].student_name;
                //     userInfo.student_college_name = rows[0].student_college_name;
                //     userInfo.degree = rows[0].degree;
                //     userInfo.major = rows[0].major;
                //     userInfo. gpa = rows[0].gpa;
                //     userInfo.grad_date = rows[0].grad_date;
                //     userInfo.student_objective = rows[0].student_objective;
                //     res.json(userInfo);
                // })
                res.end()
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
