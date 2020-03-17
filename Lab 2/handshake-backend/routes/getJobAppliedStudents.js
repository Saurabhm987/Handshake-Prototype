const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');


module.exports = app => {
    app.get('/getJobAppliedStudents', (req, res) => {

            console.log("-------------------------------------------get job applied students--------------------------------------------------")
            console.log("Getting details....");
            console.log("requested job Details:  ", req.query);
            console.log("checking pass errors..");

            if(req.query.requestInfo === "event"){

                console.log("getting student event info!");

                let company_name = req.query.company_name;

                console.log("getting app std details...");
    
                let insertQuery = 'SELECT * FROM applied_event WHERE company_name= ?';
                let query = mysql.format(insertQuery, [company_name]);
    
                pool.query(query, (err, rows)=> {
                    if(err){
                        console.log("querying error...", err);
                        res.status(200).send({
                            message: "query error!"
                        })
                    }
                    console.log("querid event data: ", rows);
                    res.json(rows);
                })

            }else{

            let company_name = req.query.company_name;

            console.log("getting app std details...");

            let insertQuery = 'SELECT * FROM applied_job WHERE company_name= ?';
            let query = mysql.format(insertQuery, [company_name]);

            pool.query(query, (err, rows)=> {
                if(err){
                    console.log("querying error...", err);
                    res.status(200).send({
                        message: "query error!"
                    })
                }
                console.log("querid data: ", rows);
                res.json(rows);
            })
            }

    });
}