const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');

module.exports = app =>{
        app.post('/postEvent', (req, res, next)=>{

            console.log("INSIDE_POST_event");

            passport.authenticate('jwtcompany', (err, user, info) => {

            if(err){
                console.log("post_event_after_passport_error: ", err);
            }

            console.log("NO_DB_ERROR!");

            if(info !== undefined){
                console.log("postevent_info_message: ", info.message);
                res.status(200).send({
                    message: info.message
                });

            }else{
                console.log("inside post event!!!!!");
    
                if(user.company_name === ""){
                    console.log("No requested body !!", req.body);
                    return  res.status(400).end();
                }
                console.log("requested body :", req.body );

                    const req_body = Object.assign(req.body.params.data);

                    let company_name = req_body.company_name; 
                    let profile_pic = req_body.profile_pic;
                    let event_name = req_body.event_name; 
                    let event_loc = req_body.event_loc;
                    let event_descr = req_body.event_descr;
                    let event_eligible = req_body.event_eligible;


                    console.log("copy_object: ", req_body);
                    console.log("user_email:", user.company_email);

                    let insertQuery = 'INSERT INTO event_info (??,??,??,??,??, ??)  VALUES (?,?,?,?,?, ?)';
                    let query = mysql.format(insertQuery, ["company_name", "profile_pic", "event_name", "event_loc", "event_descr", "event_eligible",  company_name, profile_pic, event_name, event_loc, event_descr, event_eligible]);
    
                    pool.query(query, (err, response) =>{
                        if(err){
                            console.log("Post event error : ", err);
                            return res.status(400).end("QUERY_ERROR");
                        }else{
                            console.log("successfully posted event!!");
                        }
                    })
                    res.status(200).send({
                        message: "success!"
                    });
            }
             })(req, res, next);
        })
}