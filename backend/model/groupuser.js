// const Sequelize = require('sequelize') ;
// const sequelize = require('../util/database') ;
// const User = require('./signupdetail') ;
// const Groups = require('./groupmodel');

// const groupuser = sequelize.define('groupuser' , {
    
//     id : {
//         type : Sequelize.INTEGER ,
//         autoIncrement : true ,
//         allowNull : false ,
//         primaryKey : true 
//     } ,
//     id : {
//         type : Sequelize.INTEGER ,
        
//         allowNull : false ,
//         references : {
//             model : User ,
//             key : 'id'
//         }
//     } ,

//     group_id : {
//         type : Sequelize.INTEGER ,
        
//         allowNull : false ,
//         references : {
//             model : Groups ,
//             key : 'group_id'
//         }
//     } ,
//      is_admin: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       }
      

// })  ;
// module.exports = groupuser ;