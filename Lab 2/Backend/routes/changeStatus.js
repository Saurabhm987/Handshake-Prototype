const passport = require('passport'); 
const User = require("../models/userModel");
var mongoose = require('mongoose');


module.exports = app => {
    app.post('/changeStatus', (req, res) => {
            console.log("requested job Details:  ", req.body);

            let status = req.body.status;
            let email = req.body.email;
            let _id = req.body._id;
            
            _id = mongoose.Types.ObjectId(_id)
            
            console.log('change id - ', _id)


            let options = {
                upsert: true, 
                new: true,
                useFindAndModify: false,
            }


            User.findOneAndUpdate(
                {"appliedJob._id": _id },
                {
                    $set :{
                        "appliedJob.$.status": status
                    }
                },
                options
            )
            .exec()
            .then( (response) => {
                console.log('_________student status change daa ________', response)
            })
            .catch( error => {
                console.log('error - ', error)
             })


             User.findOneAndUpdate(
                {"studentAppliedJob._id": _id},
                {
                    $set : {
                        "studentAppliedJob.$.status": status
                    },
                },
                options
            )
            .exec()
            .then( response => {
                response = response.toObject()
                console.log('_______company applied job status change_____',response.studentAppliedJob)
                res.json(response.studentAppliedJob)
            })
            .catch( error => {
                console.log('error - ', error)
            })
    });
}