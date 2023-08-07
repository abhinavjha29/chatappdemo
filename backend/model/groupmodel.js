const Sequelize = require('sequelize') ;
const sequelize = require('../util/database') ;
const groupuser = require('./groupuser') ;
const User = require('../model/signupdetail');


const Groups = sequelize.define('Groups', {
  
    group_id :  {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    
       } ,
       group_name : {
        type : Sequelize.STRING ,
       } ,
       createdby : {
        type : Sequelize.STRING
       } ,
       admin_id: {
        type: Sequelize.INTEGER,
      
      } 
} , 
{
    tableName : 'group_detail'
}
)

// Groups.belongsToMany(User , {through : groupuser , foreignKey: 'group_id'}) ;


module.exports = Groups ;