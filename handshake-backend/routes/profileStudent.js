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
                col_name: "",
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
                    userInfo.col_name = rows[0].student_college_name;
                    userInfo.degree = rows[0].degree;
                    userInfo.major = rows[0].major;
                    userInfo. gpa = rows[0].gpa;
                    userInfo.grad_date = rows[0].grad_date;
                    userInfo.student_objective = rows[0].student_objective;
                    res.json(userInfo);

                })

                }else if(req.params.requestInfo === 'expInfo'){

                    let insertQuery1 = 'SELECT * FROM experience_details WHERE ?? = ? ';
                    let query1 = mysql.format(insertQuery1, [ "student_email", requ.body.email ]);

                    pool.query(query1, (err, rows, field) =>{
                        if(err){
                            console.log("QUERY_ERROR: ", err);
                            res.end();
                        }
                        console.log("profileStudent_NO_QUERY_ERROR!");            
                        console.log('profileStudent_SENDING_EXP_INFO..........');
                        // console.log(rows);
                        console.log("_______________________________________");
                        res.json(rows);

                    })
                }else if(req.params.requestInfo === 'eduInfo'){

                    let insertQuery2 = 'SELECT * FROM education_details WHERE ?? = ? ';
                    let query2 = mysql.format(insertQuery2, [ "student_email", req.body.email ]);
    
                    pool.query(query2, (err, rows) =>{
                        if(err){
                            console.log("QUERY_ERROR: ", err);
                            res.status(200).send({
                                message: "DB_ERROR!"
                            })
                        }
                        console.log("profileStudent_NO_QUERY_ERROR!");
                        console.log("profileStudent_SENDING_EDU_INFO................");
                        // console.log(rows);
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
                    userInfo.col_name = rows[0].student_college_name;
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
