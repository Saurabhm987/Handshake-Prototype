const passport = require('passport'); 
const User = require("../models/userModel");
var kafka = require('../kafka/client');

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
            let name=reqObj.name
            let college=reqObj.college
            let degree =reqObj.degree
            let major=reqObj.major
            let gpa=reqObj.gpa
            let grad_date=reqObj.grad_date
            const email = user.email

            let emailObj = {
                email : email
            }

            let update_query = {
                $set: 
                {
                    "name": name,
                    "college": college,
                    "profileInfo.degree":degree,
                    "profileInfo.major":major,
                    "profileInfo.gpa": gpa,
                    "profileInfo.grad_date":grad_date
                },
            }

            let options = {
                upsert: true, 
                new: true,
                useFindAndModify: false,
            }

            loginObject = new Object()
            loginObject.email = emailObj
            loginObject.update_query = update_query
            loginObject.options = options
        
            kafka.make_request('update_student_profile',loginObject, (error, result)=>{
                console.log("response after make_request")
                if(error){
                    console.log("error: ", error)
                    res.status(400).send({error: "kafka make_request error"})
                }
                res.json({message: result.message})
            })

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
                 $set:
                 {
                    'education.$.education_details': data
                 }
             }

             let options = {
                upsert: true, 
                new: true,
                useFindAndModify: false,
             }

             updateObj = new Object()

             updateObj.find_query = findQuery
             updateObj.update_query = updateQuery
             updateObj.options = options

             kafka.make_request('update_education',updateObj, (error, result)=>{
                console.log("response after make_request")
                if(error){
                    console.log("error: ", error)
                    res.status(400).send({error: "kafka make_request error"})
                }
                console.log('update education result - ', result)
                res.json(result)
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

         let find_query = {
            email: email,
            'experience': 
            {
                '$elemMatch': {
                    'experience_id': _id
                }
            }
         }

         let update_query = {
             'experience.$.experience_details': data
         }

         let options = {
            upsert: true, 
            new: true,
            useFindAndModify: false,
         }

         updateObj = new Object()
         updateObj.find_query = find_query
         updateObj.update_query = update_query
         updateObj.options = options

         kafka.make_request('update_experience',updateObj, (error, result)=>{
            console.log("response after make_request")
            if(error){
                console.log("error: ", error)
                res.status(400).send({error: "kafka make_request error"})
            }
            console.log('update education result - ', result)
            res.json(result)
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