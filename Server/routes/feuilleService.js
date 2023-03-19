const { Router } = require('express');
const router = Router();

const con = require('../db');

// test with a middleware
router.use((req, res, next) => {
    console.log("Request made to Start Service ROute");
    next();
});

router.post('/day1', async(req, res) =>{
    con.query('select * from feuille_de_service where Id_conducteur = "'+req.session.userCode+'" AND DayNumber=1', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            res.json({debut: results[0].StartTime,fin: results[0].EndTime, typeService: results[0].TypeService, ligne: results[0].Ligne, vehicule: results[0].Vehicule, nbcourse: results[0].NombreCourses, id_releve: results[0].Id_releve, hasOne: results[0].HasOneCompartment, courses: results[0].NombreCourses, date: results[0].Date.toISOString().replace(/\T..+/, '')});
        }
    });
});
router.get('/day1', async(req, res) =>{
    con.query('SELECT DISTINCT service.state FROM `service`, `feuille_de_service`, `conducteur` WHERE service.Id_conducteur="'+req.session.userCode+'" AND feuille_de_service.DayNumber = 1 AND service.DATE=feuille_de_service.Date', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            if(results[0].state === 'open'){
                res.json({stateClosed: false});
            } else{
                res.json({stateClosed: true})
            }
        }
    });
});
router.post('/day2', async(req, res) =>{
    con.query('select * from feuille_de_service where Id_conducteur = "'+req.session.userCode+'" AND DayNumber=2', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            res.json({debut: results[0].StartTime,fin: results[0].EndTime, typeService: results[0].TypeService, ligne: results[0].Ligne, vehicule: results[0].Vehicule, nbcourse: results[0].NombreCourses, id_releve: results[0].Id_releve, hasOne: results[0].HasOneCompartment, courses: results[0].NombreCourses, date: results[0].Date.toISOString().replace(/\T..+/, '')});
        }
    });
});
router.get('/day2', async(req, res) =>{
    con.query('SELECT DISTINCT service.state FROM `service`, `feuille_de_service`, `conducteur` WHERE service.Id_conducteur="'+req.session.userCode+'" AND feuille_de_service.DayNumber = 2 AND service.DATE=feuille_de_service.Date', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            if(results[0].state === 'open'){
                res.json({stateClosed: false});
            } else{
                res.json({stateClosed: true})
            }
        }
    });
});
router.post('/day3', async(req, res) =>{
    con.query('select * from feuille_de_service where Id_conducteur = "'+req.session.userCode+'" AND DayNumber=3', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            res.json({debut: results[0].StartTime,fin: results[0].EndTime, typeService: results[0].TypeService, ligne: results[0].Ligne, vehicule: results[0].Vehicule, nbcourse: results[0].NombreCourses, id_releve: results[0].Id_releve, hasOne: results[0].HasOneCompartment, courses: results[0].NombreCourses, date: results[0].Date.toISOString().replace(/\T..+/, '')});
        }
    });
});
router.get('/day3', async(req, res) =>{
    con.query('SELECT DISTINCT service.state FROM `service`, `feuille_de_service`, `conducteur` WHERE service.Id_conducteur="'+req.session.userCode+'" AND feuille_de_service.DayNumber = 3 AND service.DATE=feuille_de_service.Date', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            if(results[0].state === 'open'){
                res.json({stateClosed: false});
            } else{
                res.json({stateClosed: true})
            }
        }
    });
});
router.post('/day4', async(req, res) =>{
    con.query('select * from feuille_de_service where Id_conducteur = "'+req.session.userCode+'" AND DayNumber=4', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            res.json({debut: results[0].StartTime,fin: results[0].EndTime, typeService: results[0].TypeService, ligne: results[0].Ligne, vehicule: results[0].Vehicule, nbcourse: results[0].NombreCourses, id_releve: results[0].Id_releve, hasOne: results[0].HasOneCompartment, courses: results[0].NombreCourses, date: results[0].Date.toISOString().replace(/\T..+/, '')});
        }
    });
});
router.get('/day4', async(req, res) =>{
    con.query('SELECT DISTINCT service.state FROM `service`, `feuille_de_service`, `conducteur` WHERE service.Id_conducteur="'+req.session.userCode+'" AND feuille_de_service.DayNumber = 4 AND service.DATE=feuille_de_service.Date', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            if(results[0].state === 'open'){
                res.json({stateClosed: false});
            } else{
                res.json({stateClosed: true})
            }
        }
    });
});
router.post('/day5', async(req, res) =>{
    con.query('select * from feuille_de_service where Id_conducteur = "'+req.session.userCode+'" AND DayNumber=5', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            res.json({debut: results[0].StartTime,fin: results[0].EndTime, typeService: results[0].TypeService, ligne: results[0].Ligne, vehicule: results[0].Vehicule, nbcourse: results[0].NombreCourses, id_releve: results[0].Id_releve, hasOne: results[0].HasOneCompartment, courses: results[0].NombreCourses, date: results[0].Date.toISOString().replace(/\T..+/, '')});
        }
    });
});
router.get('/day5', async(req, res) =>{
    con.query('SELECT DISTINCT service.state FROM `service`, `feuille_de_service`, `conducteur` WHERE service.Id_conducteur="'+req.session.userCode+'" AND feuille_de_service.DayNumber = 5 AND service.DATE=feuille_de_service.Date', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            if(results[0].state === 'open'){
                res.json({stateClosed: false});
            } else{
                res.json({stateClosed: true})
            }
        }
    });
});
router.post('/day6', async(req, res) =>{
    con.query('select * from feuille_de_service where Id_conducteur = "'+req.session.userCode+'" AND DayNumber=6', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            res.json({debut: results[0].StartTime,fin: results[0].EndTime, typeService: results[0].TypeService, ligne: results[0].Ligne, vehicule: results[0].Vehicule, nbcourse: results[0].NombreCourses, id_releve: results[0].Id_releve, hasOne: results[0].HasOneCompartment, courses: results[0].NombreCourses, date: results[0].Date.toISOString().replace(/\T..+/, '')});
        }
    });
});
router.get('/day6', async(req, res) =>{
    con.query('SELECT DISTINCT service.state FROM `service`, `feuille_de_service`, `conducteur` WHERE service.Id_conducteur="'+req.session.userCode+'" AND feuille_de_service.DayNumber = 6 AND service.DATE=feuille_de_service.Date', async(err, results) => {
        if(err) throw err;
        if(results.length>0){
            if(results[0].state === 'open'){
                res.json({stateClosed: false});
            } else{
                res.json({stateClosed: true})
            }
        }
    });
});

module.exports = router;