const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');


module.exports = app => {
    app.get('/getDetails', (req, res, next) => {

        console.log("-------------------------------------------getDetails--------------------------------------------------")
        console.log("Getting details....");
        console.log("requested Details:  ", req.query);

        passport.authenticate('jwtcompany',{session: false}, (err, user, info) => {
            console.log("checking pass errors..");

            if(err){
                console.log("errors while authenticating", err);
            }

            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.company_email !== null){
                console.log("email: ", user.company_email);

                if(req.query.info === "getEventDetails"){
                    console.log("getting event details...");
                    let event_id = req.query.event_id;
                    console.log("event_id: ", event_id);

                    let insertQuery = 'SELECT * FROM event_info WHERE event_id = ?';
                    let query = mysql.format(insertQuery, [event_id]);

                    pool.query(query, (err, rows)=> {
                        if(err){
                            console.log("querying error...", err);
                            res.status(200).send({
                                message: "query error!"
                            })
                        }
                        console.log("querid data: ", rows[0]);
                        res.json(rows[0]);
    
                    })
                }
            }
        })(req, res, next);
    });
}

                // if(req.params.requestInfo === "postedjob"){

                // let jobPosted = new Object();
                // let insertQuery = 'SELECT * FROM job_post WHERE company_name = ?';
                // let query = mysql.format(insertQuery, [user.company_name]);

                // pool.query(query, (err, rows) =>{

                //     if(err){
                //         console.log("QUERY_ERROR: ", err);
                //         res.status(200).send({
                //             message: "DB_ERROR"
                //         });
                //     }
                //     console.log("getJobPosted_NO_QUERY_ERROR!");
                //     console.log("-----------------rendered job info ---------------------------")

                //     jobPosted = Object.assign(rows);

                //     console.log("job posted..",jobPosted);

                //     res.json(jobPosted);
                // })

            // }else if( req.params.requestInfo === "postedevent"){

            //     let eventPosted = new Object();

            //     let insertQuery = 'SELECT * FROM event_info WHERE company_name = ?';
            //     let query = mysql.format(insertQuery, [user.company_name]);

            //     pool.query(query, (err, rows) =>{

            //         if(err){
            //             console.log("QUERY_ERROR: ", err);
            //             res.status(200).send({
            //                 message: "DB_ERROR"
            //             });
            //         }
            //         console.log("getJobPosted_NO_QUERY_ERROR!");
            //         console.log("-----------------rendered job info ---------------------------")

            //         eventPosted = Object.assign(rows);

            //         console.log("job posted..",eventPosted);

            //         res.json(eventPosted);
            //     })

            // }
            
            // else{
            //     console.log("no parameters provided!!");
            // }
//             }
//         })(req, res, next);
//     })
// }

