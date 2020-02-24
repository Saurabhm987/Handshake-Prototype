const express = require('express')
const cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql');
var pool = require('./database/db-connection');
var cors = require('cors');
const dotenv = require('dotenv').config();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : true, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.post('/login', (req, res)=>{

    console.log("In login");

    console.log("requested body: ", req.body);

    // const decryptedString = cryptr.decrypt(encryptedString);

    let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
    let query = mysql.format(insertQuery, [ "student_email", req.body.email]);

    pool.query(query, (err, row, fields)=>{
        if(err){
            console.log(err);
            return;
        }
    
       const  encryptedpsw = row[0].student_password;
       const accessControl = row[0].access; 

       console.log("access: ", accessControl);

       const decryptedString = cryptr.decrypt(encryptedpsw);
        console.log("decrypted: ", decryptedString);

       if(req.body.password === decryptedString && accessControl === "student"){
            res.cookie('cookie', "saurabh", {maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.email;
            console.log("session: ", req.session.user);
            console.log("logged In !!!!!!!!!!!!! as a student");

            res.writeHead(200, {
                'Content-Type':'text/plain'
            });

            res.end("student");

       }else if(req.body.password === decryptedString && accessControl === "prof" ){

           res.cookie('cookie', "saurabh", {maxAge: 900000, httpOnly: false, path : '/'});
           req.session.user = req.body.email;

           console.log("logged In !!!!!!!!!!!!! and you have professor access control!!!!!!");

           res.end("prof");
       }else{
           console.log("you do not have any access yet !!!!!!!!!!!!!!!!!");
        res.status(400).end();
       }

    });

});


app.post('/companyLogin', (req, res)=>{

    console.log("In comany login");

    console.log("requested body: ", req.body);

    // const decryptedString = cryptr.decrypt(encryptedString);

    let insertQuery = 'SELECT * FROM company_info WHERE ?? = ? ';
    let query = mysql.format(insertQuery, [ "company_email", req.body.email]);

    pool.query(query, (err, row, fields)=>{
        if(err){
            console.log(err);
            return;
        }
    
       const  encryptedpsw = row[0].company_psw;
       const accessControl = row[0].access; 

       console.log("access: ", accessControl);

       const decryptedString = cryptr.decrypt(encryptedpsw);
        console.log("decrypted: ", decryptedString);

       if(req.body.password === decryptedString ){
            res.cookie('cookie', "saurabh", {maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = req.body.email;
            console.log("session: ", req.session.user);
            console.log("logged In as a company!!!!!!!!1");
            res.end("company");

       }else{
           console.log("you do not have any access yet !!!!!!!!!!!!!!!!!");
           res.status(400).end();
       }
    });
});


app.post('/register', (req, res)=>{

    console.log("you are on the home page!!" , req.body);
   
    if(req.body.name === "" ||  req.body.email === "" || req.body.password === "" || req.body.uniName === "" || req.body.access ===""){
        res.status(400).end();
    } else {

        const encryptedpsw= cryptr.encrypt(req.body.password);
        var name = req.body.name;
        var email = req.body.email;
        var college_name = req.body.uniName;
        var access = req.body.access;

        console.log("encrypted_psw: ", encryptedpsw);

        let insertQuery = 'INSERT INTO ?? ( ??, ??, ??, ??, ?? ) VALUES (?, ?, ?, ?, ?) ';
        let query = mysql.format( insertQuery, ["students","student_name", "student_email","student_password","student_college_name", "access",  name, email, encryptedpsw, college_name, access ]);
        
        pool.query(query, (err, response) => {
            if(err){
                console.log(err);
                return;
            }
            
            console.log(response.insertId);

        })
       res.status(200).end();
    };
});



app.post("/companyRegister", (req, res)=>{

    console.log("on company register!!!!");

    if(req.body.name === "" ||  req.body.email === "" || req.body.password === "" || req.body.loc === "" || req.body.descr==="" || req.body.contact===""  ){
        res.status(400).end();
    } else {

        console.log("reqested body: ",req.body);

        const psw= cryptr.encrypt(req.body.password);
        var name = req.body.name;
        var email = req.body.email;
        var loc = req.body.loc;
        var descr= req.body.descr;
        var contact = req.body.contact;
        // var profile_photo = req.body.profile_photo;
        
        // console.log("encrypted_psw: ", encryptedpsw);

        let insertQuery = 'INSERT INTO ?? ( ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?) ';
        let query = mysql.format( insertQuery, ["company_info","company_name", "company_email","company_psw","company_loc", "company_descr", "company_contact",  name, email, psw, loc, descr, contact]);
        
        pool.query(query, (err, response) => {
            if(err){
                console.log(err);
                return;
            }
            
            console.log("successfully inserted !!!!!!!!!!!!!!!!!!!");
            console.log(response.insertId);

        })
       res.status(200).end();
    };

})


app.get('/home', (req, res) => {

    console.log("inside home ");

    res.send({name: user.session.user})

});

app.listen(3001);
console.log("Server Listening on port 3001");
