const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app => {
    app.get("/getStudents", (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
                if(err){
                    console.log("pass_error: ", err);
                }
                console.log("getJobItem_req_body: ", req.body.params);

                if(info !== undefined){

                    console.log("checking error msg from passport.." , info.message);
                    res.status(200).send(info.message);
                    
                }else if( user.student_email !== null){
                
                console.log("inside_get_studentsjob_item...");
                console.log("req_body: ", req.body);

                let insertQuery = 'SELECT * FROM students';
                let query = mysql.format(insertQuery);

                pool.query(query, (err, rows) =>{
                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }
                    console.log("profileStudent_NO_QUERY_ERROR!");
                    console.log("-----------------rendered student info ---------------------------")

                    studentsInfo = Object.assign(rows);
                    console.log("job posted..",studentsInfo);

                    res.json(studentsInfo);
                })
            }
            else{
                console.log("request_body_absent!");
            }
        })(req, res, next);
    })
}