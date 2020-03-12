const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
    app.get("/profileStudent/:requestInfo", (req, res, next)  => {
        console.log("CALLING_PROFILE_STUDENT");
        passport.authenticate('jwt', {session: false}, (err, user, info) => { 
        
         console.log("IN_PROFILE_STUDENT_AFT_AUTH");
        //  console.log("USER: ", user);

          if(err){
              console.log("ERROR:" , err);
          }
          // infomessage  coming from passport 
          if(info !== undefined){
            console.log("ERROR_MESSGE",   info.message);
            res.status(200).send(info.message);

            // sending username in the requested body as well
            // once auth gets clear will check email as well 
          }else if(user.student_email !== ""){

            let userInfo = {
                student_name: "",
                student_college_name: "",
                degree: "",
                grad_date: " ", 
                gpa: "",
                major: ""
            };

            if(req.params.requestInfo === 'userInfo'){

                let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
                let query = mysql.format(insertQuery, [ "student_email", user.student_email]);
        
                pool.query(query, (err, rows, field) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }

                    console.log("profileStudent_NO_QUERY_ERROR!");
                    console.log("-----------------rendered student info ---------------------------")

                    delete rows[0].student_password;
                    userInfo.student_name = rows[0].student_name;
                    userInfo.student_college_name = rows[0].student_college_name;
                    userInfo.degree = rows[0].degree;
                    userInfo.major = rows[0].major;
                    userInfo. gpa = rows[0].gpa;
                    userInfo.grad_date = rows[0].grad_date;
                    userInfo.student_objective = rows[0].student_objective;
                    userInfo.profile_pic = rows[0].profile_pic;
                    res.json(userInfo);

                })

                }else if(req.params.requestInfo === 'expInfo'){

                    console.log("geting expinfo........")

                    let insertQuery1 = 'SELECT * FROM experience_details WHERE ?? = ? ';
                    let query1 = mysql.format(insertQuery1, [ "student_email", user.student_email ]);

                    pool.query(query1, (err, rows) =>{
                        if(err){
                            console.log("QUERY_ERROR: ", err);
                            res.status(200).send({
                                message: "Q_ERROR"
                            });
                        }
                        console.log("fetched expinfo!");            
                        console.log('sending back to client.....');
                        console.log("_______________________________________");
                        res.json(rows);

                    })
                }else if(req.params.requestInfo === 'eduInfo'){

                    console.log("getting eduinfo.....")

                    let insertQuery2 = 'SELECT * FROM education_details WHERE ?? = ? ';
                    let query2 = mysql.format(insertQuery2, [ "student_email",user.student_email ]);
    
                    pool.query(query2, (err, rows) =>{
                        if(err){
                            console.log("QUERY_ERROR: ", err);
                            
                            res.status(200).send({
                                message: "DB_ERROR!"
                            })
                        }
                        console.log("profileStudent_fetched_eduInfo");
                        console.log("profileStudent_SENDING_EDU_INFO................");
                        console.log("_______________________________________");
                        res.json(rows);
                    })  
                }else if(req.params.requestInfo === 'summary'){

                let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
                let query = mysql.format(insertQuery, [ "student_email", user.student_email]);
        
                pool.query(query, (err, rows, field) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }

                    console.log("profileStudent_NO_QUERY_ERROR!");

                    delete rows[0].student_password;
                    userInfo.student_name = rows[0].student_name;
                    userInfo.student_college_name = rows[0].student_college_name;
                    userInfo.degree = rows[0].degree;
                    userInfo.major = rows[0].major;
                    userInfo. gpa = rows[0].gpa;
                    userInfo.grad_date = rows[0].grad_date;
                    userInfo.student_objective = rows[0].student_objective;
                    res.json(userInfo);
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
