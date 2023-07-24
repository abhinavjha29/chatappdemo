const user = require('../model/signupdetail') ;
const bcrypt = require('bcrypt') ;

const savedata = async(req , res , next)=>{
    try {
       const name = req.body.name ;
       const email = req.body.email ;
       const phonenumber = req.body.phonenumber ;
       const password = req.body.password ;
       const salt = 12 ;
       bcrypt.hash(password , salt , async (err , hash)=>{
        const data =  await User.create({
        
             name ,
             email ,
             password : hash
         })
         res.status(201).json({detail:data}) ;

    })
    }
    catch(err) {
        console.log(err) ;
        res.status(500).json({msg : "unable to signup"})
    }
}

module.exports = {
    savedata
}