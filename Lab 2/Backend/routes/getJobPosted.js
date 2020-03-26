const passport = require('passport'); 
const User = require("../models/userModel");

module.exports = app => {
    app.get('/getJobPosted/:requestInfo', (req, res, next) => {
        passport.authenticate('jwt',{session: false}, (err, user, info) => {
            if(err){
                console.log("errors while authenticating", err);
            }
            if(info !== undefined){
                console.log("checking error msg from passport.." , info.message);
                res.status(400).send(info.message);
                
            }else if(user.email !== null){
                if(req.params.requestInfo === "postedjob"){
                    User.find( 
                        { email : user.email},{postedJob: 1, _id:0},  
                        function(err, result){
                        if(err){
                            console.log("error_while_getting_data", err);
                        }
                        result= result[0].postedJob;                        
                        res.json(result);
                    })

                 }else if( req.params.requestInfo === "postedevent"){
                    User.find(

                        {email: user.email}, {postedEvent: 1, _id:0},
                        function(err, result){
                            if(err){
                                console.log("err: ", err)
                                res.status(400).send({msg: "Bad request"})
                            }
                            result = result[0].postedEvent;
                            console.log(result);
                            res.json(result);
                        }
                    )


                // let eventPosted = new Object();
                // let insertQuery = 'SELECT * FROM event_info WHERE company_name = ?';
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

                //     eventPosted = Object.assign(rows);

                //     console.log("Posted Event.",eventPosted);

                //     res.json(eventPosted);
                // })

            }else{
                console.log("no parameters provided!!");
            }
            }
        })(req, res, next);
    })
}

