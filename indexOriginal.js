
const express = require('express')
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
    secret              : 'cmpe273_handshake',
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

    console.log("IN_LOGIN !");
    console.log("REQUESTED_BODY :  ", req.body);

    let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
    let query = mysql.format(insertQuery, [ "student_email", req.body.email]);

    pool.query(query, (err, row, fields)=>{
        if(err){
            console.log("QUERY_ERROR! NO_USER_FOUND! ", err);
            return res.send("NO_USER");
        } else if(row.length > 0){

            console.log("QUERY_RESULT: ", row.length);
            const  encryptedpsw = row[0].student_password;
            const decryptedString = cryptr.decrypt(encryptedpsw);
            console.log("decrypted: ", decryptedString);

            if(req.body.password === decryptedString){

                res.cookie('cookie', req.body.email, {maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = req.body.email;
                console.log("session: ", req.session.user);
                console.log("logged In !!!!!!!!!!!!! as a student");
                res.send("SUCCESS");
           }else{
                console.log("INCORRECT_CREDENTIALS!");
                res.send("FAIL");
           }
        }else{
            res.send("NOT_EXIST")
        }
    });
});


app.post('/companyLogin', (req, res)=>{

    console.log("In comany login");

    console.log("requested body: ", req.body);

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

    console.log("register route post!!" , req.body);
   
    if(req.body.name === "" ||  req.body.email === "" || req.body.password === "" || req.body.uniName === "" ){
        res.status(400).end();
    } else {

        const encryptedpsw= cryptr.encrypt(req.body.password);
        var name = req.body.name;
        var email = req.body.email;
        var college_name = req.body.uniName;
        var access = "STUDENT";  
                 
        console.log("POSTING_STUDENT_EDU");
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

app.post('/studentDetails', (req, res) =>{
    
    console.log("IN_STUDENT_DETAILS!");

    if(req.body.details === "EDU"){
        
            console.log("POSTING_STUDENT_EDU");

            delete req.body.details;

            let eduObj = {
                student_college_name: req.body.student_college_name	,
                student_college_location : req.body.student_college_location,
                student_college_degree : req.body.student_college_degree,
                student_college_major : req.body.student_college_major,
                student_college_yop : req.body.student_college_yop,
                student_college_gpa	 : req.body.student_college_gpa,
                student_email	:  req.body.student_email
            }

            let valArray = Object.values(eduObj);
            let colArray = Object.keys(eduObj);
            let finQuery = [...colArray , ...valArray];
            console.log("VAL_ARRAY: ", finQuery);

            let insertQuery = 'INSERT INTO education_details ( ??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,? )';
            let query = mysql.format(insertQuery, finQuery);

            pool.query(query, (err, response) => {
                if(err){
                    console.log('QUERY_EDU_ERROR');
                    res.end();
                }
                console.log("QUERY_SUCCESS!");
                res.end();
            })  

        }else if(req.body.details === "EXP"){

            console.log("POSTING_STUDENT_EXP");
            
            delete req.body.details; 

            let valArray = Object.values(req.body);
            let colArray = Object.keys(req.body);

            let finQuery = [...colArray , ...valArray];
            
            let insertQuery = 'INSERT INTO experience_details ( ??,??,??,??) VALUES (?,?,?,? )';
            let query1 = mysql.format(insertQuery, finQuery);

            pool.query(query1, (err, response) => {
                if(err){
                    console.log('QUERY_ERROR', err);
                    res.end();
                }
                console.log("QUERY_EXP_SUCCESS!");
                res.end();
            })    

        }else{
            console.log("INCORRECT_EXP_EDU_DETAILS!");
            res.end();
        }
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

app.get('/getUser/:requestInfo', (req, res) =>{

        console.log("IN_GET_USER");

        let userInfo = {
            name: "",
            col_name: "",
            degree: "",
            grad_date: " ", 
            gpa: "",
            major: ""
        };
      
        let student_email = "student1@gmail.com"

        if(req.params.requestInfo === "userInfo"){

            let insertQuery = 'SELECT * FROM students WHERE ?? = ? ';
            let query = mysql.format(insertQuery, [ "student_email", student_email ]);
    
            pool.query(query, (err, rows, field) =>{
                if(err){
                    console.log("QUERY_ERROR: ", err);
                    res.end();
                }
    
                console.log("NO_QUERY_ERROR!");
                delete rows[0].student_password;
    
                userInfo.name = rows[0].student_name;
                userInfo.col_name = rows[0].student_college_name;
                userInfo.degree = rows[0].degree;
                userInfo.major = rows[0].major;
                userInfo. gpa = rows[0].gpa;
                userInfo.grad_date = rows[0].grad_date;
    
                // console.log("USER_INFO: ", userInfo);

                res.json(userInfo);
    
            })
        }else if(req.params.requestInfo === "expInfo"){

            let insertQuery1 = 'SELECT * FROM experience_details WHERE ?? = ? ';
            let query1 = mysql.format(insertQuery1, [ "student_email", student_email ]);
    
            pool.query(query1, (err, rows, field) =>{
                if(err){
                    console.log("QUERY_ERROR: ", err);
                    res.end();
                }
                console.log("NO_QUERY_ERROR!");

                // console.log("EXP_INFO_1: ", rows[0]);
    
                res.json(rows);
    
            })
        }else if(req.params.requestInfo === "eduInfo"){

                let insertQuery2 = 'SELECT * FROM education_details WHERE ?? = ? ';
                let query2 = mysql.format(insertQuery2, [ "student_email", student_email ]);

                pool.query(query2, (err, rows, field) =>{
                    if(err){
                        console.log("QUERY_ERROR: ", err);
                        res.end();
                    }
                    console.log("NO_QUERY_ERROR!");
                    // console.log("EDU_INFO_2 : ", rows[0]);

                    res.json(rows);

                })        
        }else{

            res.send("BAD_REQUEST");
        }

})

app.get('/companyInfo', (req, res) => {

})

app.post('/updateUserProfile', (req, res) =>{
    
    console.log("IN_UPDATE_USER_PROFILE!");

    if(req.body.details === "LOGIN"){

        console.log("IN_LOGIN_UPDATE");
        // let student_email = req.session.user;    USE ACTUAL 
        // console.log("USER_SESSION: ", student_email );

        let student_email = "student1@gmail.com";
        // let psw = req.body.student_password;
        // const encryptedString = cryptr.encrypt(psw);
        // console.log("ENCRYPT: ", psw);

        let loginObj = {
            student_name: req.body.student_name,
            // student_password:encryptedString,
            student_college_name: req.body.student_college_name,
            degree : req.body.degree,
            major: req.body.major,
            gpa: req.body.gpa,
            grad_date: req.body.grad_date
        }

        let insertQuery = 'UPDATE students SET ? WHERE student_email = ? ';
        let query = mysql.format(insertQuery, [loginObj, student_email ] );

        console.log("QUERY_FORMED: ", query);

        pool.query(query, (err, row)=>{
            if(err){
                console.log("QUERY_ERROR: ", err);
                res.end();
            }
            
            console.log("ROWS: ", row);

            // let db_decryption = cryptr.decrypt(rows[0].student_password);

            console.log("QUERY_SUCCESS!");
            // console.log("AFFECTED_ROWS", rows[0].student_name  ,"+", db_decryption);

            res.end();

        })

    }else if(req.body.details ==="EDU"){

        console.log("IN_EDU_UPDATE");

        let student_email = "student1@gmail.com";

        let eduObj = {
            student_college_name: req.body.student_college_name	,
            student_college_location : req.body.student_college_location,
            student_college_degree : req.body.student_college_degree,
            student_college_major : req.body.student_college_major,
            student_college_yop : req.body.student_college_yop,
            student_college_gpa	 : req.body.student_college_gpa,
            // student_email	:  req.body.student_email USE ACTUAL 
        }

        let student_education_id = req.body.student_education_id;

        let insertQuery = 'UPDATE education_details SET ? WHERE student_email = ? AND student_education_id= ?';
        let query = mysql.format(insertQuery, [eduObj, student_email, student_education_id]);

        pool.query(query, (err, response)=>{
            if(err){
                console.log("QUERY_ERRRO", err);
                res.end();
            }
            console.log("QUERY_SUCCESS!");
        })

        res.end();
        
    }else if(req.body.details === "EXP"){

        console.log("IN_EXP_UDPATE");

        student_email = "student1@gmail.com";
        let student_experience_id = req.body.student_ex_id;

        delete req.body.details;
        delete req.body.student_ex_id;

        console.log("REQUESTED_BODY: ", req.body);

        let insertQuery = 'UPDATE experience_details SET ? WHERE student_experience_id = ?  AND  student_email = ?';
        let query = mysql.format(insertQuery, [req.body,student_experience_id, student_email]);
        
        pool.query(query, (err, res)=>{
            if(err){
                console.log("QUERY_ERROR", err);
                res.end();
            }

            console.log("QUERY_SUCCESS!");
        })

        res.end();

    }else{
        console.log("INVALID_DETAILS!");
        res.end();
    }

});

app.post('/updateCompanyProfile', (req, res) =>{
    
});

app.post('/postJob', (req, res)=>{

    console.log("inside post job!!!!!")
    console.log("requested body :", req.body );

    if(req.body.job_title === ""){
        console.log("No requested body !!", req.body);
        return  res.status(400).end();
    }

        let job_title  =  req.body.job_title;
        let job_loc    =   req.body.job_loc;
        let  job_salary  = req.body.job_salary;
        let  job_post_date =  req.body.job_post_date;
        let  job_descr  = req.body.job_descr;
        let company_name = req.body.company_name ;
    

    let insertQuery = 'INSERT INTO ?? ( ??, ??, ??, ??, ??, ?? ) VALUES (?, ?, ?, ?, ?, ?)';
    let query = mysql.format(insertQuery, ["job_post", "job_title", "job_loc","job_salary", "job_post_date", "job_descr", "company_name", job_title, job_loc, job_salary, job_post_date, job_descr, company_name]);
    
    pool.query(query, (err, response) =>{
        if(err){
            console.log("Post job error : ", err);
            return res.status(400).end("QUERY_ERROR");
        }else{
            console.log("successfully posted job!!");
        }
    })

    res.status(200).end();

});



app.post('/postEvent', (req, res)=>{
    
    console.log("inside event job!!!!!")
    console.log("requested body :", req.body );

    if(req.body.event_name === ""){
        console.log("No requested body !!", req.body);
        return  res.status(400).end();
    }

        let event_name  =  req.body.event_name;
        let event_loc   =   req.body.event_loc;
        let  event_descr  = req.body.event_descr;
        let event_time =  req.body.event_time;
        let  event_eligible  = req.body.event_eligible; 
        let company_name = req.body.company_name;   

    let insertQuery = 'INSERT INTO ?? ( ??, ??, ??, ??, ??,?? ) VALUES (?, ?, ?, ?, ?,?)';
    let query = mysql.format(insertQuery, ["event_info", "event_name", "event_loc","event_descr", "event_time", "event_eligible", "company_name", event_name, event_loc, event_descr, event_time, event_eligible, company_name]);
    
    pool.query(query, (err, response) =>{
        if(err){
            console.log("Post event error : ", err);
            return res.status(400).end("QUERY_ERROR");
        }else{
            console.log("successfully posted event!!");
        }
    })
    res.status(200).end();
});


app.post('/jobApply', (req, res) =>{

    if(req.body.company_name === "" || req.body.job_id ===""){
        console.log("No requested body !!", req.body );
        return res.status(400).end();
    }

    let job_id = req.body.job_id;
    let company_name = req.body.company_name;
    let student_email = req.body.student_email;
    let job_status = req.body.job_status;
     // this should be session user 
    // let student_email = req.session.user;

    let insertQuery = 'INSERT INTO ?? ( ??, ??, ??, ?? ) VALUES (?, ?, ?, ?)';
    let query = mysql.format(insertQuery, ["applied_job", "job_id", "student_email","job_status", "company_name", job_id, student_email, job_status, company_name]);
    
    pool.query(query, (err, response) =>{
        if(err){
            console.log("Applied job error : ", err);
            return res.status(400).end();
        }else{
            console.log("successfully applied to job!!");
            res.status(200).end("APPLIED");
        }
    })
});


app.post('/eventApply', (req, res) =>{

    console.log("event ID: ", req.body.event_id);

    if(req.body.company_name === "" || req.body.event_id ===""){
        console.log("No requested body !!", req.body );
        return res.status(400).end();
    }

    let event_id = req.body.event_id;
    let company_name = req.body.company_name;
    let student_email = req.body.student_email;
    let event_status = req.body.event_status;

     // this should be session user 
    // let student_email = req.session.user;

    let insertQuery = 'INSERT INTO ?? ( ??, ??, ??, ?? ) VALUES (?, ?, ?, ?)';
    let query = mysql.format(insertQuery, ["applied_event", "event_id", "student_email","event_status", "company_name", event_id, student_email, event_status, company_name]);
    
    pool.query(query, (err, response) =>{
        if(err){
            console.log("Applied event error : ", err);
            return res.status(400).end();
        }else{
            console.log("successfully applied to event!!");
            res.status(200).end("APPLIED");
        }
    })
});


app.get('/home', (req, res) => {

    console.log("Inside Job Apply !!!! ");
    res.send({name: user.session.user});

});

app.listen(3001);
console.log("Server Listening on port 3001")




// refer user add exp and edu details

            /*
               let expObj = {
                student_company_name: req.body.student_company_name,
                student_company_job_title: req.body.student_company_job_title,
                student_company_job_loc: req.body.student_company_job_loc,
                student_company_job_sdate: req.body.student_company_job_sdate,
                student_company_job_edate: req.body.student_company_job_edate,
                student_company_job_descr: req.body.student_company_job_descr,
                student_email: req.body.student_email
                //  student_email: req.session.user ACTUAL USE
            } 

            
            let valArray = Object.values(expObj);
            let colArray = Object.keys(expObj);
            let finQuery = [...colArray , ...valArray];
            // console.log("VAL_ARRAY: ", finQuery);

            let insertQuery = 'INSERT INTO experience_details ( ??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,? )';
            let query = mysql.format(insertQuery, finQuery);

            console.log("QUERY1_SHORT: ", query1);
            console.log("QUERY_LONG: ", query);

            pool.query(query, (err, rows) => {
                if(err){
                    console.log('QUERY_ERROR');
                    res.end();
                }
                console.log("QUERY_EXP_SUCCESS!");
                res.end();
            })  */