const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');


module.exports = app => {
    app.post('/changeStatus', (req, res) => {

            console.log("-------------------------------------------get job applied students--------------------------------------------------")
            console.log("Getting details....");
            console.log("requested job Details:  ", req.body);
            console.log("checking pass errors..");

            // let company_name = req.query.company_name;

            let job_status = req.body.status;
            let student_email = req.body.student_email;
            let job_id = req.body.job_id;

                    console.log("getting app status details...", job_status);

                    let insertQuery = 'UPDATE applied_job SET job_status = ?  WHERE student_email = ? AND  job_id = ?';
                    let query = mysql.format(insertQuery, [job_status,student_email, job_id ]);


                    console.log("chage status query: ", query);

                    pool.query(query, (err, rows)=> {
                        if(err){
                            console.log("querying error...", err);
                            res.status(200).send({
                                message: "query error!"
                            })
                        }
                        console.log("Status Changed")
                    })

                    res.end();
    });
}