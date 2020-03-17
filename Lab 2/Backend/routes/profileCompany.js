const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
    app.get("/profileCompany/:requestInfo", (req, res, next)  => {
        console.log("CALLING_PROFILE_Company");
        passport.authenticate('jwtcompany', {session: false}, (err, user, info) => { 
        
         console.log("IN_PROFILE_Company_AFT_AUTH");

          if(err){
              console.log("ERROR:" , err);
          }
          
          if(info !== undefined){
            console.log("ERROR_MESSGE",   info.message);
            res.status(200).send(info.message);

            // sending username in the requested body as well
            // once auth gets clear will check email as well 
          }else if(user.company_email !== ""){

            let companyInfo = {
                company_name: "",
                company_loc: "",
                company_descr: "",
                company_contact: " ", 
                profile_pic: "",
            };

            if(req.params.requestInfo === 'companyInfo'){

                let insertQuery = 'SELECT * FROM company_info WHERE ?? = ? ';
                let query = mysql.format(insertQuery, [ "company_email", user.company_email]);
        
                pool.query(query, (err, rows) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }

                    console.log("profileCompany_NO_QUERY_ERROR!");
                    console.log("-----------------rendered company info ---------------------------")

                    delete rows[0].student_password;
                    companyInfo.company_name = rows[0].company_name;
                    companyInfo.company_loc = rows[0].company_loc;
                    companyInfo.company_descr = rows[0].company_descr;
                    companyInfo.company_contact = rows[0].company_contact;
                    companyInfo.profile_pic = rows[0].profile_pic;
                    companyInfo.access = rows[0].access;
                    res.json(companyInfo);

                })

                }else if(req.params.requestInfo === 'postedJobInfo'){

                    console.log("geting postedJobInfo........")

                    let insertQuery1 = 'SELECT * FROM job_post WHERE ?? = ? ';
                    let query1 = mysql.format(insertQuery1, [ "company_name", user.company_name ]);

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
                } 
                else if(req.params.requestInfo === 'summary'){

                let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
                let query = mysql.format(insertQuery, [ "company_email", user.company_email]);
        
                pool.query(query, (err, rows, field) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }

                    console.log("profileStudent_NO_QUERY_ERROR!");

                    delete rows[0].student_password;
                    companyInfo.student_name = rows[0].student_name;
                    companyInfo.student_college_name = rows[0].student_college_name;
                    companyInfo.degree = rows[0].degree;
                    companyInfo.major = rows[0].major;
                    companyInfo. gpa = rows[0].gpa;
                    companyInfo.grad_date = rows[0].grad_date;
                    companyInfo.student_objective = rows[0].student_objective;
                    res.json(companyInfo);
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