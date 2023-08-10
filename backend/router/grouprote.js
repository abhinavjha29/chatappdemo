const express = require('express') ;
const group = require('../controller/groupcontroller') ;
const auth = require('../middlewere/authenticate') ;
router = express.Router() ;

router.post('/create' ,auth.authenticate ,group.newgroup) ;
router.get('/getgroups' , auth.authenticate, group.getgroup) ;
router.get('/getallusers' , auth.authenticate , group.getAllUsers) ;
router.get('/showparticipant' , auth.authenticate , group.getcurrentparticipants) ;

router.post('/adduser' , auth.authenticate , group.addusers) ;
router.post('/addadmin' , auth.authenticate , group.addadmin) ;
router.post('/removeuser' , auth.authenticate , group.removeuser) ;
module.exports = router ;