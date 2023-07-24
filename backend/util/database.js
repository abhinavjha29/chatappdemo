const Sequelize = require('sequelize') ;
require('dotenv').config() ;


const sequelize = new Sequelize('chatapp' , 'root' , '12345678' , {
    dialect: 'mysql' ,
    host: 'localhost'
}) ;
module.exports = sequelize ; 
