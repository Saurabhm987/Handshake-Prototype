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
    app.post('/uploadCmpProfPic', upload.single('file'), function (req, res, next) {
        passport.authenticate('jwtcompany', (err, user, info) => {
                if(err){
                    console.log("passport_error!!", err);
                }

                if(info !== undefined){
                    console.log("info_error: ", info.message);
                }else{

                    console.log("request Call !!!");
                    console.log("user_got: ", user.company_email);
                    let email = user.company_email;
                    let company_info = "company_info";
                    let company_email = "company_email"
                    let fileType = "profile_pic"

                    // function uploadFile(source,targetName, mimetype, type, emailType, email,  res)

                      // insertQuery = 'UPDATE ?? SET ?? = ? WHERE ?? = ? '
                      // query = mysql.format(insertQuery, [type, fileType, storeURL,emailType, email ])

                    // function uploadFile(source,targetName, mimetype, type,fileType, emailType, email,  res){

                    uploadFile(req.file.path, req.file.filename, req.file.mimetype, company_info, fileType, company_email, email, res);

                }
        })(req, res, next);
    })
  }

