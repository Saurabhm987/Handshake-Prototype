const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
        app.post('/addEduExp', (req, res, next) =>{
            passport.authenticate('jwt', {session: false}, (err, user, info) =>{
                    console.log("IN_STUDENT_DETAILS!");

                    if(err){
                        console.log("error while authenticating! ", err);
                    }

                    if(info !== undefined){
                        console.log("addEduExp_error_msg: ", info.message);
                        res.status(200).send({
                            message: "Error_auth_cant_add_info"
                        })
                    }else{

                        if(req.body.params.requestInfo === "EDU"){
            
                            console.log("POSTING_STUDENT_EDU");

                            let reqObj = req.body.params.data;
                            console.log("reqObj", reqObj);

                            let student_email = user.student_email;

                            let eduObj = {
                                student_college_name: reqObj.student_college_name	,
                                student_college_location : reqObj.student_college_location,
                                student_college_degree : reqObj.student_college_degree,
                                student_college_major : reqObj.student_college_major,
                                student_college_yop : reqObj.student_college_yop,
                                student_college_gpa	 : reqObj.student_college_gpa,
                                student_email	: student_email
                            }

                            let valArray = Object.values(eduObj);
                            let colArray = Object.keys(eduObj);
                            let finQuery = [...colArray , ...valArray];
                            console.log("VAL_ARRAY: ", finQuery);

                            let insertQuery = 'INSERT INTO education_details ( ??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,? )';
                            let query = mysql.format(insertQuery, finQuery);

                            pool.query(query, (err, response) => {
                                if(err){
                                    console.log('QUERY_EDU_ERROR');
                                    res.status(200).send({
                                        message:"Query Error!"
                                    });
                                }
                                console.log("QUERY_SUCCESS!");
                            })  

                            res.status(200).send({
                                message: "Education added!"
                            });

                        }else if(req.body.params.requestInfo === "EXP"){

                            console.log("POSTING_STUDENT_EXP");

                            let reqObj = req.body.params;
                            reqObj.student_email = user.student_email;
                            
                            let valArray = Object.values(reqObj);
                            let colArray = Object.keys(reqObj);

                            let finQuery = [...colArray , ...valArray];
                            
                            let insertQuery = 'INSERT INTO experience_details ( ??,??,??,??) VALUES (?,?,?,? )';
                            let query1 = mysql.format(insertQuery, finQuery);

                            pool.query(query1, (err, response) => {
                                if(err){
                                    console.log('QUERY_ERROR', err);
                                    res.end();
                                }
                                console.log("QUERY_EXP_SUCCESS!");
                                res.end();
                            })    

                        }else{
                            console.log("INCORRECT_EXP_EDU_DETAILS!");
                            res.end();
                        }
                    }
                })(req, res, next);
        });
}