const User = require('../models/userModel');
const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


function handle_request(msg, callback){
    console.log("In login handle request:"+ JSON.stringify(msg));

     User.findOne({ email : msg.email}, function(err, user){
                if(err){
                    console.log("pass login error !", err);
                    callback(err, 'Mongo Error')
                }
                console.log("loginUser: ", user)
                if(user === null){
                    console.log("user doesn't exist!")
                    callback(null, {error: "Username doesn't exist"})
                    // return done(null, false, {message: "Username doesn't exist!"});
                } else {
                    console.log("else condition")
                    const  encryptedpsw = user.password;
                    const decryptedString = cryptr.decrypt(encryptedpsw);
                    if(msg.password  === decryptedString){
                        console.log(`user exist!`)
                        callback(null, user.toObject())
                        // return done(null, user.toObject());
                    }else{
                        console.log("Password doesn't match!");
                        callback(null, {error: "Incorrect Password"})
                        // return done(null, false, {message: "Incorrect Password"});
                    }
                }
            })
}

exports.handle_request = handle_request;