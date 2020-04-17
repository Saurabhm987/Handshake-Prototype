// MongoDB Connection 
// const dotenv = require('dotenv').config();
const mongoURI = require('../config/key')
const mongoose = require('mongoose');
var url = mongoURI.MONGOURI
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
