const passport = require('passport'); 
const User = require('../models/userModel')  
module.exports = app => {
app.get('/fetchSkill',  (req, res, next) =>{
    passport.authenticate('jwt', {session: false}, (err, user, info) =>{

    if(err){
        console.log("add_skills_ERROR: ",   err);
    }
    
    if(info !== undefined){
        console.log("ERROR_MESSGE_UPDATE_STUDENT",   info.message);
        res.status(200).send(info.message);

    }else if(user.email !== ""){

        const email = req.query.email

        User.findOne(
            {email : email},
            {skills: 1, _id:0},
        )
        .exec()
        .then( response => {
            console.log( 'fetch skill response - ', response.skills)
            // res.json(response.skills)
            res.json(response.skills)
        })
    }

})(req, res, next);
});
}