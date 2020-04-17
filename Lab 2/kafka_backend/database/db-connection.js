// MongoDB Connection 
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const key = require('../config/key')
var url = key.MONGOURI;
var pool; 

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if(err){
        console.log("Mongo Connection err..!", err);
        return
    }
    pool = db;
    
    console.log("Mongo connection successful!");
} )

module.exports = pool;