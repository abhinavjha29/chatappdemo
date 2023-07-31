const express = require('express') ;
const group = require('../controller/groupcontroller') ;
const auth = require('../middlewere/authenticate') ;
router = express.Router() ;

router.post('/create' ,auth.authenticate ,group.newgroup) ;

module.exports = router ;