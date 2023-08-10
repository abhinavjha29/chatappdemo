const sequelize = require('../util/database') ;
const Sequelize = require('sequelize') ;

const User = sequelize.define('User', {
    id: {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    } ,
    name :Sequelize.STRING 
    ,
    email: {
        type : Sequelize.STRING ,
        allowNull : false , 
        unique : {
            msg : 'Email already exist'
        } ,
        validate : {
          isEmail : {
            msg : "Put correct Username"
          }
        }
    } ,
    password : {
type : Sequelize.STRING ,
allowNull : false ,
validate: {
    notNull: {
      msg: 'Please enter your password'
    }
  }
    } ,
   phonenumber: {
type : Sequelize.DOUBLE ,
unique : true ,
allowNull : false ,
validate : {
    notNull: {
        msg: "Please enter phn no."
    }
}
   } ,
  
   
} 
, {
  tableName : "user_detail"
})


module.exports = User ;