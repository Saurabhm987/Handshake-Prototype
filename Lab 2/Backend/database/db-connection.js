// MongoDB Connection 

const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
var url = process.env.MONGOURI;
var pool; 

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if(err){
        console.log("Mongo Connection err..!", err);
        return
    }
    pool = db;
    
    console.log("connection successful!");
} )

module.exports = pool;
