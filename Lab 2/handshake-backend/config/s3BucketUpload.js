const fs=require('fs');
const keys = require('../config/key');
var mysql = require('mysql');
var pool = require('../database/db-connection');
const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: keys.iam_access_id,
    secretAccessKey: keys.iam_secret,
    region: 'us-west-1'
  });

  const s3= new AWS.S3();

  function uploadFile(source,targetName, mimetype, type,fileType, emailType, email,  res){
    console.log('preparing to upload...');
    fs.readFile(source, function (err, filedata) {
      if (!err) {
        const putParams = {
            Bucket      : 'handshake-imgpdf-bucket',
            Key         : targetName,
            Body        : filedata,
            ContentType: mimetype,
            ACL: "public-read"
        };
        s3.putObject(putParams, function(err, data){
          if (err) {

            console.log('Could nor upload the file. Error :',err);
            return res.send({success:false});

          } 
          else{

            console.log('Successfully uploaded the file');

            targetName = targetName.replace(/ /g,"+");
            
            // console.log("targetName: ", targetName);

          let storeURL = keys.pic_url + targetName; 
          console.log("storeURL:" , storeURL);

            insertQuery = 'UPDATE ?? SET ?? = ? WHERE ?? = ? '
            query = mysql.format(insertQuery, [type, fileType, storeURL,emailType, email ])

            pool.query(query, (err, res)=> {

                if(err){
                    console.log("DB_ERROR: ", err)
                }else{
                    console.log("inserted to db!");
                }
            });
            // console.log("query: ", query);
            return res.send({success:true});
          }
        });
      }
      else{
        console.log({'err':err});
      }
    });
  }

  module.exports = uploadFile;