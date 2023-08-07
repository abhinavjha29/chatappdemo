const User = require('../model/signupdetail') ;
const group = require('../model/groupmodel') ;
const Op = require('sequelize') ;

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
 await resp.addUser(admin_id) ;
console.log(resp) ;
if(resp) {
 
    return res.status(200).json({success : "succes" , messege : "group created" ,  group_detail: resp})
}

   }
   catch(err) {
    console.log(err) ;
    res.status(500).json({messege : "error creating group"})
   }

}

const getgroup = async(req , res , next)=>{
    try {
        console.log(req.user)
            const memberid = req.user.id ;
            console.log(req.user.id) ;
            const user = await User.findByPk(memberid);
            console.log("user is +"+JSON.stringify(user))
            const getgroupdetaail = await user.getGroups({
              raw : true ,
              joinTableAttributes: [],
            });

         
console.log("grp detailsi"+getgroupdetaail) ;
           
            return    res.status(200).json({ groupdetail: getgroupdetaail });
        
   
       
    }
    catch(err){
        console.log(err) ;
    }

}

const getAllUsers = async (req, res ,next) => {
    try {
      const users = await User.findAll({
        where: {
          id: {
            [Op.not]: req.user.id,
          },
        },
        attributes: ["name", "phonenumber", "id"],
      });
      console.log(users) ;
     return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };

module.exports = {
   getgroup ,
    newgroup ,
    getAllUsers
}