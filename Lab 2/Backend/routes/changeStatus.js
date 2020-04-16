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

            User.findOneAndUpdate(
                {email : email , "appliedJob._id": _id },
                {
                    $set :{
                        "appliedJob.$.status": status
                    }
                }
            )
            .then( () => {
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
                    new: true
                }
            )
            .then( response => {
                console.log('_______indentify_____',response.studentAppliedJob)
                res.json(response.studentAppliedJob)
            })
            .catch( error => {
                console.log('error - ', error)
            })
    });
}