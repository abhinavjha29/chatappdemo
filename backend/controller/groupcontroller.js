const User = require('../model/signupdetail') ;
const group = require('../model/groupmodel') ;

const newgroup = async(req , res , next)=>{
   try {
    const group_name = req.body.group_name ;
    const createdby = req.body.name ;
    const admin_id = req.user.id ;
const resp = await group.create({
    group_name ,
    createdby ,
    admin_id
})
return res.status(200).json({success : "succes" , messege : "group created" ,  group_detail: resp})
   }
   catch(err) {
    console.log(err) ;
    res.status(500).json({messege : "error creating group"})
   }

}

module.exports = {
    newgroup
}