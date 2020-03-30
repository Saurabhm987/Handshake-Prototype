const passport = require('passport'); 
const User = require("../models/userModel");

module.exports = app => {
app.put('/updateUserProfile', (req, res, next) =>{
    passport.authenticate('jwt', {session: false}, (err, user, info) =>{
    if(err){
        console.log("updateStudent_ERROR: ",   err);
    }
    
    if(info !== undefined){
        console.log("ERROR_MESSGE_UPDATE_STUDENT",   info.message);
        res.status(200).send(info.message);

    }else if(user.email !== ""){
        if(req.body.params.requestInfo === "LOGIN"){
            console.log("IN_LOGIN_UPDATE");
            let reqObj = req.body.params.data;
            console.log("updateStudent_login_reqObj: ",reqObj)
    
                let name=reqObj.student_name
                let college=reqObj.student_college_name
                let degree =reqObj.degree
                let major=reqObj.major
                let gpa=reqObj.gpa
                let grad_date=reqObj.grad_date
            
                const email = user.email

            User.updateOne(
                {email: email},
                {$set: {
                    "name": name,
                    "college": college,
                    "profileInfo.degree":degree,
                    "profileInfo.major":major,
                    "profileInfo.gpa": gpa,
                    "profileInfo.grad_date":grad_date
                }},
                {upsert: true},
                (err, result)=> {
                    if(err){
                        console.log("err: ", err)
                        res.status(400).send({message: "error"})
                    }
                    console.log("result: ", result);
                    res.status(200).send({message: "Profile Updated!"});
                }
            )
    }else if(req.body.params.requestInfo ==="EDU"){
        console.log("IN_EDU_UPDATE");

        let student_email =user.email;

        let eduObj = {
            student_college_name: req.body.params.data.student_college_name	,
            student_college_location : req.body.params.data.student_college_location,
            student_college_degree : req.body.params.data.student_college_degree,
            student_college_major : req.body.params.data.student_college_major,
            student_college_yop : req.body.params.data.student_college_yop,
            student_college_gpa	 : req.body.params.data.student_college_gpa,
        }

        let student_education_id = req.body.params.data.student_education_id;

        let insertQuery = 'UPDATE education_details SET ? WHERE student_email = ? AND student_education_id= ?';
        let query = mysql.format(insertQuery, [eduObj, student_email, student_education_id]);

        pool.query(query, (err, rows)=>{
            if(err){
                console.log("QUERY_ERRRO", err);
                res.status(200).send({
                    message: "Q_ERROR"
                });
            }
            res.status(200).send({message: "Updated"});

            console.log("QUERY_SUCCESS!");
        })

    }else if(req.body.details === "EXP"){

        console.log("IN_EXP_UDPATE");

        student_email = user.student_email;
        let student_experience_id = req.body.student_ex_id;
        
        delete req.body.details;
        delete req.body.student_ex_id;

        console.log("REQUESTED_BODY: ", req.body);

        let insertQuery = 'UPDATE experience_details SET ? WHERE student_experience_id = ?  AND  student_email = ?';
        let query = mysql.format(insertQuery, [req.body,student_experience_id, student_email]);
        
        pool.query(query, (err, res)=>{
            if(err){
                console.log("QUERY_ERROR", err);
                res.end();
            }

            console.log("QUERY_SUCCESS!");
        })

        res.end();

    }else if(req.body.params.requestInfo === "summary"){

        console.log("INSIDE_SUMMARY_UPDATE!");
        console.log("updateInfo_RESPONSE_OBJ: ", req.params);
  
        updateObj = req.body.params.data;
        student_email = user.student_email;

        let insertQuery = 'UPDATE students SET ?? = ? WHERE student_email = ? ';
        let query = mysql.format(insertQuery, ["student_objective",updateObj, student_email ] );
        
        pool.query(query, (err, row)=>{
            if(err){
                console.log("QUERY_ERROR: ", err);
                res.end();
            }
            console.log("ROWS: ", row);
            console.log("QUERY_SUCCESS.....");
            console.log("Summary Saved.....");
        });
        res.status(200).send({
            message: "Summary Saved!"
        });
    }else{
        console.log("PLEASE_PROVIDE_SUMMARY_PARAMS!");
        console.log("request_query", req);
    }
    }else{
        console.log("INVALID TOKEN!");
        res.status(200).send({
            message: 'UNAUTHORIZED'
        })
    }
})(req, res, next);
});
}