const { Router } = require('express');

const router = Router();

const con = require('../db');

// test with a middleware
router.use((req, res, next) => {
    console.log("Request made to Start Service ROute");
    next();
});

router.post('/', (req, res) => {
    const IdLigne = req.body.idLigne;
    const idVehicule = req.body.idVehicule;
    const idConducteur = req.session.userCode;
    const StartTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    // replace(/T/, ' ') replace T with a space
    // replace(/\..+/, '') delete the dot and everything after
    const date = new Date().toISOString().replace(/\T..+/, ''); //delete the T letter and everything after
    //checking whether our service has started or not
    con.query('SELECT State FROM service WHERE DATE = "'+date+'" And Id_conducteur = "'+idConducteur+'"', (err, results) =>{
        if(err) throw err;
        if(results.length > 0){
            res.json({result: false, message: 'error! service was already started'});
        }else{
            con.query('INSERT INTO service(Id_conducteur, Id_ligne, Id_vehicule, Date, State, Start_time) values("'+idConducteur+'", "'+IdLigne+'", "'+idVehicule+'", "'+date+'", "open", "'+StartTime+'")');
            res.json({result: true, message: 'Success! service started successfully'});
        }
    });
});
module.exports = router;
