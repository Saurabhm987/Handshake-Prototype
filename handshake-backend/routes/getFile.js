const retrieveFile  = require('../config/s3BucketGet')

module.exports = app => {
    app.get('/get_file/:file_name',(req,res)=>{
        retrieveFile(req.params.file_name, res);
      });
  }
  
