const { Router } = require('express');

const router = Router();

const con = require('../db');

//validator parameters
const { check, validationResult } = require('express-validator');

// test with a middleware 
router.use((req, res, next) => {
    console.log("Request made to End Service ROute");
    next();
});

router.post('/',[
        check('secondDriver')
            .notEmpty()
            .withMessage('Enter a valid driver\'s code'),
        check('sum')
            .notEmpty()
            .withMessage('sum field cannot be empty'),
        check('lack') 
            .notEmpty()
            .withMessage('lack field cannot be empty'),    
        check('image')
            .notEmpty()
            .withMessage('It\'s necessary to take an image')
    ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = errors.array();
        res.json({result: false, message: error[0].msg});
    }else {
        const secondDriver = req.body.secondDriver;
        const sum = req.body.sum; 
        const lack = req.body.lack;
        const image = req.body.image;
        const codeConducteur = req.session.userCode;
        const EndTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
        //replace(/T/, ' ') replace T with a space
        // replace(/\..+/, '') delete the dot and everything after
        const date = new Date().toISOString().replace(/\T..+/, ''); //delete the T letter and everything after
        //check if the service was ended, and if it is started or not yet
        con.query('SELECT State FROM service WHERE DATE = "'+date+'" And Id_conducteur = "'+codeConducteur+'"', (err, results) => {
            if(err) res.json({result: false, message: 'error! service not started yet', refresh: true});
            if(results.length > 0 ){
                if((results[0].State === 'closed')){
                    res.json({result: false, message: 'error! service was already ended', refresh: true});
                }else {
                    con.query('UPDATE service SET Id_conducteur2 = "'+secondDriver+'", somme = '+sum+', manque = '+lack+', Photo= "'+image+'", State= "closed", End_time = "'+EndTime+'" WHERE DATE = "'+date+'" And Id_conducteur = "'+codeConducteur+'" ', (err, results) => {
                        if(err) res.json({result: false, message: 'Error! try again'});
                        else{
                            res.json({ result: true, message: "Success! Service ended successfully"});
                        } 
                    }); 
                }
            }else {
                res.json({result: false, message: 'error! service not started yet', refresh: true});
            }
        });
    }
});
module.exports = router;