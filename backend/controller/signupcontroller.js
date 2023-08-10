const User = require('../model/signupdetail') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;

function generateaccesstoken(id) {
    return jwt.sign({ userId :id} , 'Secretpassword12131')
}

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
             phonenumber ,
             password : hash
         })
         res.status(201).json({detail:data , msg: "Succesfull Signup"}) ;

    })
    }
    catch(err) {
        console.log(err) ;
        res.status(500).json({msg : "unable to signup"})
    }
}

const logindata  = async(req , res , next)=>{ 
    try {
        const {phonenumber , password , name} = req.body ;
        const reqdata = await User.findAll({where : {
             name : name ,
                phonenumber : phonenumber
            
        }})
        if(reqdata.length==0) {
            return res.status(404).json({messege : "user not found"})
        }
        if(reqdata.length>0) {
            bcrypt.compare( password , reqdata[0].password , (err , result)=>{
            
                if(err) {
                    console.log(err) ;
                    return res.status(404).json({messege : "something went wrong"})
                }
                if(result=== false)
                {
                    console.log(result) ;
     
                  return res.status(401).json({success :false, messege : "incorrect password"})
                }
                       else { 
                        console.log("true") ;
            return res.status(200).json({success : true , messege : "user logged succesfully" , token: generateaccesstoken(reqdata[0].id)})
           }
            })
    

        }
    }
    catch(err) {
        console.log(err) ;
        res.status(500).json({msg: "something went wrong"})
    }

}

module.exports = {
    savedata ,
    logindata
}