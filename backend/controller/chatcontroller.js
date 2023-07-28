const userchat = require('../model/chatmodel') ;


const savechat = async(req , res , next)=>{
    try {
const chat = req.body.chat ;
const userid = req.user.id ;
const name = req.body.name ;
console.log(userid) ;
const chat_detail = await userchat.create({
    chat , userId : userid , name
})
return res.status(200).json({messege : "chat updated" , detail : chat_detail})
    }
   
    catch(err) {
        console.log(err) ;
    res.status(500).json({messege : "something went wrong"}) ;
    }
} 

const getchats = async(req , res , next)=>{
    try {
const chats = await userchat.findAll() ;
return res.status(200).json({chats})
    }
    catch(err) {
        console.log(err) ;
        return res.status(500)
    }
}

module.exports = {
    savechat ,
    getchats
}