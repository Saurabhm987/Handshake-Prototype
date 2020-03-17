const passport = require('passport'); 
var mysql = require('mysql');
var pool = require('../database/db-connection');
const uploadFile = require('../config/s3BucketUpload');
  
module.exports = app => {
app.post('/addSkills',  (req, res, next) =>{

    // console.log("addSkills: ", req);
    console.log("CHECKING_AUTH_TOKEN");

    passport.authenticate('jwt', {session: false}, (err, user, info) =>{
    console.log("add_skills !");

    if(err){
        console.log("add_skills_ERROR: ",   err);
    }
    
    if(info !== undefined){
        console.log("ERROR_MESSGE_UPDATE_STUDENT",   info.message);
        res.status(200).send(info.message);

    }else if(user.student_email !== ""){
        console.log("updateStudent..user exist!");

        let email = user.student_email;
        console.log("email: ", email);

        let skills = req.body.data
        console.log("skills", skills);

        // insertQuery = 'INSERT INTO studensts  '

        res.end()
    }

})(req, res, next);
});
}