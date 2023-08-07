const express = require('express') ;
const chat = require('../controller/chatcontroller') ;
const auth = require('../middlewere/authenticate') ;
router = express.Router() ;

router.post('/savechat' , auth.authenticate , chat.savechat) ; 
router.get('/getchat/:id' , auth.authenticate , chat.getchats ) ;
module.exports = router ;