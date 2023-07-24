const express = require('express') ;
const user = require('../controller/signupcontroller') ;

router= express.Router() ;

router.post('/save' , user.savedata) ;

module.exports = router ;