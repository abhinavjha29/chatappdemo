const userchat = require('../model/chatmodel') ;


const savechat = async(req , res , next)=>{
    try {
const chat = req.body.chat ;
const userid = req.user.id ;
const name = req.body.name ;
const group_id = req.body.groupid ;
console.log(group_id) ;
console.log(userid) ;
const chat_detail = await userchat.create({
    chat , UserId : userid , name , group_id
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
const chats = await userchat.findAll({
    where : {
        group_id : req.params.id
    }
}) ;
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