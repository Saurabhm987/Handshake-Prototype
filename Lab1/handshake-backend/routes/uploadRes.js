const multer  = require('multer');
const passport = require('passport'); 
const uploadFile = require('../config/s3BucketUpload');

const storage = multer.diskStorage({
    destination : 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  module.exports = app => {
    app.post('/uploadResume', upload.single('file'), function (req, res, next) {
        console.log("in upload resume!!!");
        passport.authenticate('jwt', (err, user, info) => {
                if(err){
                    console.log("passport_error!!", err);
                }

                if(info !== undefined){
                    console.log("info_error: ", info.message);
                }else{

                    console.log("request Call !!!");
                    console.log("user_got: ", user.student_email);
                    let email = user.student_email;
                    let students = "students";
                    let student_email = "student_email";
                    let resume = "resume";

                    // function uploadFile(source,targetName, mimetype, type,fileType, emailType, email,  res)

                    uploadFile(req.file.path, req.file.filename, req.file.mimetype, students,resume, student_email, email, res);

                }
        })(req, res, next);
    })
  }

