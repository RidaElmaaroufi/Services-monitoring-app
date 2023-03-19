const express = require('express');
const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);
var mysql = require('mysql');
//routes preparation
const usersRoute = require('./routes/users');
const StartServiceRoute = require('./routes/StartServices');
const EndServiceRoute = require('./routes/EndService');
const logoutRoute = require('./routes/logout');
const feuilleServiceRoute = require('./routes/feuilleService');
const ChangePasswordRoute = require('./routes/ChangePassword');
const con = require('./db');
const { ValidatorsImpl } = require('express-validator/src/chain');
const app = express();

//store
const storeSession = new mysqlSession(con);

//session middleware

app.use(session({
    name: 'SESSION_ID',      // cookie name stored in the client side
    secret: 'some secret', //this secret is used to sign ID cookie
    resave: false,            //for every request to server we ant to create a new session?
    saveUninitialized: false,     //if we have not modified the session we don't  want to save it
    //store: storeSession,
    cookie: {
        maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session is stored 30 days
    }
}));
app.use(express.json());
app.use(express.urlencoded( {extended: false} ));//for post requests


//testing middlware
app.use((req, res, next)=>{
    console.log(` ${req.method} - ${ req.url} `);
    next();
});

app.use('/users', usersRoute);  //login
app.use('/logout', logoutRoute);

//Start Service Route
app.use('/StartService', StartServiceRoute);


app.use('/EndService', EndServiceRoute);
app.use('/feuilleService', feuilleServiceRoute);
app.use('/ChangePassword', ChangePasswordRoute);

// //middlware function
// app.use((req, res, next) =>{
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     next();//decider function wich will decide if our logic should move to the next logic or not
// });
// app.get("/login", (req, res) => {
    
//         con.query("SELECT nom, password FROM conducteur WHERE prenom = 'reda'", function (err, result) {
//             if (err) throw err;
//             res.send(result[0].nom);
//       });
      
// });


// const users = [
//     {name : "reda", age : "22"},
//     {name : "ismail", age : 19},
//     {name : "mouhssin", age : 20}
// ]

// app.get("/users/:name?", (req, res) => {

//     const { name } = req.params;
//     const user = users.find((obj) => obj.name === name);
//     if(user){//checking if the user was found
//         res.status(200).send(user);
//     }else{
//         res.status(404).send('user not found');
//     }
//     res.send(users);
//     //res.send(req.params);
//     //res.status(404).send(users[0].age);

// });

// const posts = [
//     { title : "there is some posts"},
//     { title : "Another posts"},
// ]

// app.get("/posts", (req, res) => {
//     const { title } = req.query;
//     const post = posts.find((obj) => obj.title === title);
//     if(title){//if the query parameter present
//         if(post){//checking if the post was found
//             res.status(200).send(post);
//         }else{
//             res.status(404).send('post not found');
//         }
//     }
//     res.status(200).send(post);
    
// });

// //post requests
// app.post("/", (req, res) =>{
//     //console.log(req.body);
//     const user = req.body;
//     users.push(user);
//     res.status(201).send('user created');

// });



// app.post("/login", (req, res)=>{
//     console.log(req.sessionID);
//     const { username, password } = req.body;
//     if(username && password){
//         if(req.session.authenticated){
//             res.json(req.session);
//         }else{
//             if( password === 'reda123'){
//                 req.session.authenticated = true;
//                 req.session.user = {username, password};
//                 res.json(req.session);
//             }else{
//                 res.status(404).json({msg : 'Bad credentials'});
//             }  
//         }
//     }else res.status(404).json({msg : 'Bad credentials'});
// });

app.listen(3000, ()=>{
    console.log("server listening on port 3000");
})


