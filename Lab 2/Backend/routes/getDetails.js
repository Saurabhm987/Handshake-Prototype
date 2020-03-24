const passport = require('passport'); 
const User = require('../models/userModel');

module.exports = app => {
    app.get('/getDetails', (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }

            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(200).send(info.message);
                
            }else if(user.email !== null){
                if(req.query.info === "getEventDetails"){
                    User.find(
                        {email: user.email}, 
                        {postedEvent:1, _id:0},
                        (err, result)=>{
                            if(err){
                                console.log("error: ", err);
                            }
                            result = result[0].postedEvent;
                            res.json(result[0]);
                        }
                    )
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

