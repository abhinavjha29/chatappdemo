const sequelize = require('../util/database') ;
const Sequelize = require('sequelize') ;

const Chat = sequelize.define('Chat' , {
   id :  {
    type : Sequelize.INTEGER ,
    autoIncrement : true ,
    allowNull : false ,
    primaryKey : true 

   } ,
   chat : {
    type : Sequelize.STRING ,
    allowNull : false 
   } ,
   userId : {
    type: Sequelize.INTEGER
   } ,
   name : {
    type : Sequelize.STRING
   }

} , {
    tableName : 'chats'
}
 )
 module.exports = Chat ;