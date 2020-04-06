const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');
const uploadFile = require('../config/s3BucketUpload');
  
module.exports = app => {
app.post('/updateCompanyProfile',  (req, res, next) =>{

    console.log("updateComapanyReq: ", req);
    console.log("CHECKING_AUTH_TOKEN");

    passport.authenticate('jwtcompany', {session: false}, (err, user, info) =>{
    console.log("IN_UPDATE_COMPANY_PROFILE!");

    if(err){
        console.log("updateStudent_ERROR: ",   err);
    }
    
    if(info !== undefined){
        console.log("ERROR_MESSGE_UPDATE_STUDENT",   info.message);
        res.status(200).send(info.message);

    }else if(user.company_email !== ""){
        console.log("updateStudent..user exist!");

        if(req.body.params.requestInfo === "LOGIN"){

                console.log("IN_LOGIN_UPDATE");
                let reqObj = req.body.params.data;
                // console.log("updateStudent_login_reqObj: ",reqObj)
                company_email = user.company_email;
            
                let loginObj = {
                    company_loc: reqObj.company_loc,
                    company_contact : reqObj.company_contact,
                }

                let insertQuery = 'UPDATE company_info SET ? WHERE company_email = ? ';
                let query = mysql.format(insertQuery, [loginObj, company_email ] );
                console.log("QUERY_FORMED: ", query);

                pool.query(query, (err, row)=>{
                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.end();
                    }
                    console.log("ROWS: ", row);
                    console.log("QUERY_SUCCESS!");
                })
                
                res.status(200).send({
                    message: "Updated"
                });

    }else if(req.body.params.requestInfo === "DESCR"){

        console.log("Description edit!");

        let company_email = user.company_email;
        let data = req.body.params.data
    
        console.log("REQUESTED_BODY: ",data);

        let insertQuery = 'UPDATE company_info SET ? WHERE company_email = ?';
        let query = mysql.format(insertQuery, [data, company_email]);
        
        pool.query(query, (err, rows)=>{
            if(err){
                console.log("QUERY_ERROR", err);
                res.status(200).end();
            }   

            console.log("QUERY_SUCCESS!");
        })

        res.end();

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
