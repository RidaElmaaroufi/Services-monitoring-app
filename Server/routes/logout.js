const { Router } = require('express');
const router = Router();

router.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();//decider function wich will decide if our logic should move to the next logic or not
});

router.get("/", (req, res) =>{
    req.session.isAuth = false;
    res.send('ok');
});
module.exports = router;

