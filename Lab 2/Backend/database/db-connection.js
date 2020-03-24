// MongoDB Connection 

const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
var url = process.env.MONGOURI;
var pool; 

mongoose.connect(url, {poolSize : 50}, (err, db) => {
    if(err){
        console.log("something went wrong! ", err);
        return
    }
    pool = db;
    
    console.log("connection successful!");
} )

module.exports = pool;
