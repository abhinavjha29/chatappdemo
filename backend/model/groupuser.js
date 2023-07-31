const Sequelize = require('sequelize') ;
const sequelize = require('../util/database') ;

const groupuser = sequelize.define('groupuser' , {
    id : {
        type : Sequelize.INTEGER ,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    } ,
    is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }

})  ;
module.exports = groupuser ;