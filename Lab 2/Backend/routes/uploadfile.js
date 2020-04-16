const multer  = require('multer');
const passport = require('passport'); 
const path = require('path');
const User = require('../models/userModel');

const storage = multer.diskStorage({
    destination : './public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });
  
  module.exports = app => {
    app.post('/uploadFile', upload.single('file'), function (req, res, next) {
        passport.authenticate('jwt', (err, user, info) => {
                if(err){
                    console.log("passport_error!!", err);
                }

                if(info !== undefined){
                    console.log("info_error: ", info.message);
                }else{

                    if( req.file.mimetype === 'application/pdf'){
                      const email =  user.email

                          User.findOneAndUpdate(
                            {email: email},
                            {
                              $set:
                              {
                                'profileInfo.resume' : req.file.filename
                              }
                            },
                            {
                              new: true,
                              useFindAndModify: false
                            }
                          )
                          .exec()
                          .then( response => {
                            console.log(`response : ${response}`)
                            res.end()
                          })
                          .catch( error => {
                            console.log(`error : ${error}`)
                            res.end()
                          })
                    }else{
                        let email = user.email;

                        User.findOneAndUpdate(
                          {email: email},
                          {
                            $set:
                            {
                              'profileInfo.profile_pic' : req.file.filename
                            }
                          },
                          {
                            new: true,
                            useFindAndModify: false
                          }
                        )
                        .exec()
                        .then( response => {
                          console.log(`response : ${response}`)
                          res.end()
                        })
                        .catch( error => {
                          console.log(`error : ${error}`)
                          res.end()
                        })
                    }
                    // function uploadFile(source,targetName, mimetype, type,fileType, emailType, email,  res)
                    // uploadFile(req.file.path, req.file.filename, req.file.mimetype, students, profile_pic , student_email, email, res);
                }
        })(req, res, next);
    })
  }

