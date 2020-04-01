const passport = require('passport'); 
const User = require("../models/userModel");
// var ObjectID = require("bson-objectid");

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
    
            let name=reqObj.name
            let college=reqObj.college
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
            let email =user.email;
            let _id = req.body.params.data._id;
            let data = new Object();

             data.college = req.body.params.data.college
             data.location = req.body.params.data.location
             data.degree = req.body.params.data.degree
             data.major =  req.body.params.data.major
             data.yop = req.body.params.data.yop
             data.gpa  =  req.body.params.data.gpa

             let findQuery = {
                email: email,
                'education': 
                {
                    '$elemMatch': {
                        'education_id': _id
                    }
                }
             }

             let updateQuery = {
                 'education.$.education_details': data
             }

            User.updateOne(
                findQuery,
                {'$set': updateQuery}
            )
            .then( response => {
                console.log("updated_response: ",response);
                res.status(200).send({message:"Added Education"});
            })  
            .catch( err => {
                console.log("error: ", err);
                res.status(400).send({msg: "bad request!"});
            })

    }else if(req.body.params.requestInfo === "EXP"){
        console.log("IN_EXP_UDPATE");
        let email =user.email;
        let _id = req.body.params.data._id;
        console.log("_id: ", _id);
        let data = new Object();

         data.title = req.body.params.data.title
         data.position = req.body.params.data.position
         data.company_name = req.body.params.data.company_name
         data.joined_date =  req.body.params.data.joined_date
         data.description = req.body.params.data.description

         console.log("data: ", data);

         let findQuery = {
            email: email,
            'experience': 
            {
                '$elemMatch': {
                    'experience_id': _id
                }
            }
         }

         let updateQuery = {
             'experience.$.experience_details': data
         }

        User.updateOne(
            findQuery,
            {'$set': updateQuery}
        )
        .then( response => {
            console.log("updated_response: ",response);
            res.end();
        })  
        .catch( err => {
            console.log("error: ", err);
            res.status(400).send({msg: "bad request!"});
        })

    }else if(req.body.params.requestInfo === "SUMMARY"){
        console.log("summary_update")
        updateObj = req.body.params.data;
        const email = user.email;

        User.updateOne(
            {email: email}, 
            {$set: 
                {"profileInfo.summary": updateObj}
            },
            {upsert: true},
            (err, result) => {
                if(err){
                    console.log("err: ", err);
                }
                console.log("result: ", result);
                res.end();
            }
        )
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