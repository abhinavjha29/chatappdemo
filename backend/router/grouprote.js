const express = require('express') ;
const group = require('../controller/groupcontroller') ;
const auth = require('../middlewere/authenticate') ;
router = express.Router() ;

router.post('/create' ,auth.authenticate ,group.newgroup) ;
router.get('/getgroups' , auth.authenticate, group.getgroup) ;
router.get('/getuser' , auth.authenticate , group.getAllUsers) ;
module.exports = router ;