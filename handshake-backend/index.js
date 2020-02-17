const express = require('express')
const app = express();
var mysql = require('mysql');
const dotenv = require('dotenv').config();

var connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
});

app.get('/newhome', (req, res)=>{
    res.send("you are on the home page!!");
});

app.get('/secret', (req, res)=>{
    res.send("you are on the secret page!!!!!");
});

app.get('/', (req, res)=>{
    connection.connect(function(err){
        if(!err){
            res.send('we are connected!!!');
        }else{
            res.send("not connected!!!");
        }
    })
});

app.listen(5000);