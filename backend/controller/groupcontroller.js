const User = require('../model/signupdetail') ;
const group = require('../model/groupmodel') ;
const {Op}  = require('sequelize') ;

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
 await resp.addAdmin(admin_id);

if(resp) {
 
    return res.status(200).json({success : "succes" , messege : "group created" ,  group_detail: resp})
}

   }
   catch(err) {
    console.log(err) ;
   return res.status(500).json({messege : "error creating group"})
   }

}

const getgroup = async(req , res , next)=>{
    try {
        
            const memberid = req.user.id ;
         
            const user = await User.findByPk(memberid);
           
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
      console.log("users are"+users) ;
     return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };

  const addusers = async(req , res , next)=>{
try {

  const group_id = req.body.group_id ;
  const participantid = req.body.user_id ;
  const response = await group.findByPk(group_id) ;
  
  if(response) {
 const hasUser = await response.hasUser(req.user.id) ;
 if(hasUser) {
await response.addUser(participantid) ;
return res.status(201).json({message : "user added succesfully"})
 }
 else {
   return res.status(401).json({message : "Invalid Request"})
 }
 }
 else {
  return res.status(404).json({message : "Invalid Request"})
 }

}
catch(err) {
  console.log(err) ;
  return res.status(500).json({messege : "Internal error"})
}
  }

  const getcurrentparticipants = async(req , res , next)=>{
    try {
      const group_id = await req.get('group_id') ;
      const resp = await group.findByPk(group_id) ;
      const participants = await resp.getUsers({
        attributes: ["id", "name", "phonenumber"],
        raw: true,
        where: {
          id: {
            [Op.not]: req.user.id,
          },
        },
        joinTableAttributes: [],
      });
      return res.status(201).json({participants})
    }
    catch(err) {
      console.log(err)
    return res.status(500).json({message : "something went wrong"})
    }

  }
  const addadmin = async(req , res , next)=>{
    try {
      const {group_id , participant_id} = req.body ;
      
      const resp = await group.findByPk(group_id) ;
      const isadmin = await resp.hasAdmin(participant_id) ;
      console.log("isadmin is"+isadmin)
      if(isadmin) {
        return res.status(401).json({message : "already admin"}) ;
      }
      else {
        const hasUser = await resp.hasUser(req.user.id) 
        if(hasUser) {
    await resp.addAdmin(participant_id) ;
    return res.status(201).json({message : "admin added succesfully"})
        }
        else {
          return res.status(401).json({message : "invalid request"})
        }
      }
    

    } catch (error) {
    console.log(error) ;
    return res.status(500).json({message : "something went wrong"})
    }
  }

  const removeuser = async(req , res , next)=>{
   try {
    const {group_id , participant_id} = req.body
    const resp = await group.findByPk(group_id) ;
    const hasUser = await resp.hasUser(req.user.id) ;
    if(hasUser) {
      await resp.removeUser(participant_id) ;
      await resp.removeAdmin(participant_id) ;
      res.status(201).json({message : "user deleted succesfully"}) ;
    }
    else res.status(401).json({message : "bad request"})
   } catch (err) {
    console.log(err) ;
    res.status(500).json({message : "ERROR"})
   }
  }
  



module.exports = {
  removeuser ,
   getgroup ,
    newgroup ,
    getAllUsers ,
    addusers ,
    getcurrentparticipants
, addadmin
  }