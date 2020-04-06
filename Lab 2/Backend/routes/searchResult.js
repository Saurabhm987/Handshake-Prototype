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
                // const email = user.email
                const searchText = req.params.searchText
                console.log("searchText: ", searchText);

                find_query = {
                    'access':'company',
                    'postedJob': {
                        $elemMatch: {
                            'title' :'Dev'
                        }
                    }
                }

                User.find(find_query)
                    .then(response=>{
                        console.log("find_response: ", response)
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