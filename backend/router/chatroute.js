const express = require('express') ;
const chat = require('../controller/chatcontroller') ;
const auth = require('../middlewere/authenticate') ;
router = express.Router() ;

router.post('/savechat' , auth.authenticate , chat.savechat) ; 
module.exports = router ;