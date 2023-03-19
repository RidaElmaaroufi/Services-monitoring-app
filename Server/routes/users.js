const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');


const con = require('../db');

//validator parameters
const { check, validationResult } = require('express-validator');

/*
 * middlware function
 */
router.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();//decider function wich will decide if our logic should move to the next logic or not
});

// test with a middleware
router.use((req, res, next) => {
    console.log("Request made to Routes");
    next();
});

router.get('/', async(req, res) => {
    console.log(req.session.isAuth)
    res.json({result: req.session.isAuth, message: "Authentication request"});
    // const username ='777777';
    // const pwd = "123456";
    // const salt = await bcrypt.genSalt(10);
    // const pwdhashed = await bcrypt.hash(pwd, salt);
    // con.query('INSERT INTO conducteur(ID,password) VALUES("'+username+'","'+pwdhashed+'")'); 
    // res.json({result: 'ok', message: "Authentication request"});


    //const {id} = req.params;
    // const results = await con.query(`SELECT * FROM conducteur`);
    // res.send(results.data);
    // console.log(results.data);
    // if(id)
    // res.send('hello '+id);
    // res.send('hello just');
});

router.post('/',[
    check('code')
        .notEmpty()
        .withMessage('username cannot be empty')
        .isLength({ min: 6 })
        .withMessage('code should be at least 6 characters'),
    check('password').notEmpty().withMessage('Password cannot be empty')
    ], (req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = errors.array();
        res.json({result: false, message: error[0].msg});
    } else {
        try {
            const user = {
                code: req.body.code,
                password: req.body.password
            };
                con.query(`SELECT nom,password,prenom FROM conducteur WHERE ID =${user.code}`, async(err, results) => {
                    if(err) throw err;
                    if(results.length>0){
                        let password = results[0].password;
                        req.session.name = results[0].nom;
                        req.session.prenom = results[0].prenom;
                        //bcryp
                        const validPassword  = await bcrypt.compare(user.password, password);
                        //if(password == user.password)
                        if(validPassword){
                            console.log('ok');
                            req.session.isAuth = true;
                            req.session.userCode = user.code;
                            res.json({result: req.session.isAuth, message: req.session.name, code: req.session.userCode, prenom: req.session.prenom});
                            console.log(req.session.name);
                        }
                        else{
                            res.json({result: false, message: 'Indicated username or/and password are not correct.'});
                        }
                    }
                    else{
                        res.json({result: false, message: 'Indicated username or/and password are not correct.'});
                    }
                });
        } catch (error) {
            console.error(error);
            res.json({result: false, message: 'Request operation error.'});
        }   
        // if(Uname === name){
        //     res.redirect('/login');
        // } 
    }
    // const {username, password} = req.body;
    // if( username && password){
    //     console.log(username, password);
    //     try {
    //         con.query(`INSERT INTO conducteur VALUES(12,'elmaafi','mouhn',2300','0675340022')`);
    //         res.status(200).send({msg : 'created user'});   
    //     } catch (error) {
    //         console.log('error');
    //     }
    // }
});



module.exports = router;