const Sequelize = require('sequelize') ;
const sequelize = require('../util/database') ;

const User  = require('./signupdetail') ;

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
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      }
} , 
{
    tableName : 'group_detail'
}
)



module.exports = Groups ;