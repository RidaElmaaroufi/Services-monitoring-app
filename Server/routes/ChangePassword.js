const { Router } = require('express');

const router = Router();
const bcrypt = require('bcrypt');


const con = require('../db');

//validator parameters
const { check, validationResult } = require('express-validator');

router.use((req, res, next) => {
    console.log("Request made to Change Password ROute");
    next();
});


router.post('/', 
                check('ancien')
                .notEmpty()
                .withMessage('le champs Ancien mot de passe est obligatoire '),
                check('nouveau')
                .notEmpty()
                .withMessage('Erreur')
                .isLength({ min: 8 })
                .withMessage('Au moins 8 caractères sont demandé'),
                check('confirmation')
                .notEmpty()
                .withMessage('Erreur de correspondance')
            , (req, res) =>{
                const errors = validationResult(req);
                if(!errors.isEmpty()){
                    const error = errors.array();
                    res.json({result: false, message: error[0].msg});
                } else {
                    try {
                        const {ancien, nouveau, confirmation} = req.body;
                            con.query(`SELECT password FROM conducteur WHERE ID =${req.session.userCode}`, async(err, results) => {
                                if(err) throw err;
                                if(results.length>0){
                                    let password = results[0].password;
                                    //bcrypt
                                    const validPassword  = await bcrypt.compare(ancien, password);
                                    //if(password == user.password)
                                    if(validPassword){
                                        //new password validation
                                        if(nouveau===confirmation){
                                            //password crypting
                                            const salt = await bcrypt.genSalt(10);
                                            const PwdCrypte = await bcrypt.hash(nouveau, salt);
                                            con.query(`UPDATE conducteur SET password='${PwdCrypte}' where ID =${req.session.userCode}`)
                                            res.json({result: true, message: 'Votre mot de passe a bien été réinitialisé'});

                                        }else {
                                            res.json({result: false, message: 'le nouveau mot de passe n\'est compatible'});
                                        }
                                    }
                                    else{
                                        res.json({result: false, message: 'Ancien mot de passe est incorrect'});
                                    }
                                }
                                else{
                                    res.json({result: false, message: 'ERROR.'});
                                }
                            });
                    } catch (error) {
                        console.error(error);
                        res.json({result: false, message: 'Request operation error.'});
                    }
                }
            });


module.exports = router;