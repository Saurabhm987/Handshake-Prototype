const passport = require('passport'); 
const User = require("../models/userModel");

module.exports = app => {
    app.get('/search/:searchText', (req, res, next) =>{
        passport.authenticate('jwt', {session: false}, (err, user, info) =>{
            console.log("sarching........")
            if(err){
                res.status(400).end()
            }
            if(info !== undefined){
                console.log("info: ", info.message);
                res.status(400).end()
            }
            if(user){
                const searchText = req.params.searchText.toString()

                User.createIndexes({ title: 'text'})

                User.find(
                    {
                        'postedJob.title' : {
                            '$regex' : '/*'+searchText+'/*'
                        }
                    },
                    { 'postedJob': 1}
                
                    // {
                    //     $text: {
                    //         $search: searchText
                    //     }
                    // }
                )
                .exec()
                .then(response=>{
                    console.log(" Search response -  ", JSON.stringify(response))
                    res.end()
                })
                .catch(err=>{
                    console.log("error: ", err)
                    res.status(400).end()
                })

                res.status(200).send({message: "success"})
            }else{
                res.status(400).end()
            }
        })(req, res, next)
    })
}