const passport = require('passport'); 
const User = require('../models/userModel')  
module.exports = app => {
app.post('/addSkill',  (req, res, next) =>{
    passport.authenticate('jwt', {session: false}, (err, user, info) =>{

    if(err){
        console.log("add_skills_ERROR: ",   err);
    }
    
    if(info !== undefined){
        console.log("ERROR_MESSGE_UPDATE_STUDENT",   info.message);
        res.status(200).send(info.message);

    }else if(user.email !== ""){

        let email = user.email;
        let skill = req.body.params.data
        console.log('email skill add --------------------------', email)
        console.log( 'skill data - ', skill)

        let options = {
            upsert: true, 
            new: true,
            useFindAndModify: false,
        }

        User.findOneAndUpdate(
            {email : email},
            {
                $addToSet : 
                {
                    skills: skill
                }
            },
            options
        )
        .then( response => {
            console.log( 'response - ', response.skills)
            res.json(response.skills)
        })
    }

})(req, res, next);
});
}