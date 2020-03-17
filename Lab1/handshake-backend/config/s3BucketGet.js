const AWS = require('aws-sdk');
const keys = require('./key');
  
  AWS.config.update({
    accessKeyId: keys.iam_access_id,
    secretAccessKey: keys.iam_secret,
    region: 'us-west-1'
  });

  const s3= new AWS.S3();

function retrieveFile(filename,res){
    const getParams = {
      Bucket: keys.bucket_name,
      Key: filename
    };
  
    s3.getObject(getParams, function(err, data) {
      if (err){
        return res.status(400).send({success:false,err:err});
      }
      else{
          console.log("successfully loaded file!");
        return res.send(data.Body);
      }
    });
  }

  module.exports = retrieveFile;