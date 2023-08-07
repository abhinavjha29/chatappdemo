const jwt = require('jsonwebtoken') ;
const User = require('../model/signupdetail') ;

const authenticate = async (req , res , next)=>{
    try {
const token = await req.header('Authorization') ; 
const user = jwt.verify(token , 'Secretpassword12131') ;

const response =  await User.findByPk(user.userId) ;
// const response = await User.findOne({
//     where: {
//         id: user.memberId
//     }
// });
console.log(response) ;
req.user = response ;

next() ;
    }
    catch(err) {
        console.log(err) ;
        return res.status(404).json({err : "user not found"})
    }
}

module.exports = { authenticate }  ;