const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');


module.exports = app => {
    app.get('/getEventBoard/:requestInfo', (req, res, next) => {
        console.log("GETTING_Event_DASHBOARD");
        console.log("CALLING_PASS_AUTH");
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            console.log("checking pass errors..");

            if(err){
                console.log("errors while authenticating", err);
            }

            console.log("getEventBoard_req_body: ", req.body.params);


            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.student_email !== null){

                if(req.params.requestInfo === "board"){

                let eventPosted = new Object();

                let insertQuery = 'SELECT * FROM event_info';
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

                    eventPosted = Object.assign(rows);

                    console.log("job posted..",eventPosted);

                    res.json(eventPosted);
                })


            }else if(req.params.requestInfo === "appliedevents"){

                let eventApplied = new Object();

                student_email = user.student_email;

                let insertQuery = 'SELECT * FROM applied_event WHERE student_email = ?';
                let query = mysql.format(insertQuery, [student_email]);

                pool.query(query, (err, rows) =>{

                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.status(200).send({
                            message: "DB_ERROR"
                        });
                    }
                    console.log("profileStudent_NO_QUERY_ERROR!");
                    console.log("-----------------rendered student info ---------------------------")

                    eventApplied = Object.assign(rows);

                    console.log("event applied.",eventApplied);

                    res.json(eventApplied);
                })

            }else {
                console.log("No parameters recieved !");
                res.end();
            }
            }
        })(req, res, next);
    })
}

