const Express = require('express') ;
const bodyparser = require('body-parser') ;
const cors = require('cors') ; 

const userroute = require('./router/signuproute') ;
const sequelize = require('./util/database');
const chatroute = require('./router/chatroute') ;
const chatmodel = require('./model/chatmodel') ;
const usermodel = require('./model/signupdetail') ;
//const Groupuser = require('./model/groupuser') ;
const Groups = require('./model/groupmodel');
const grouproute = require('./router/grouprote') ;

const app = Express() ;
app.use(bodyparser.json()) ;
app.use(cors({
    origin : '*'
})) ;
usermodel.hasMany(chatmodel) ;
 chatmodel.belongsTo(usermodel) ;
Groups.hasMany(chatmodel) ;
 chatmodel.belongsTo(Groups) ;
Groups.belongsToMany(usermodel , {through : 'Groupuser' , foreignKey: 'group_id'}) ;
usermodel.belongsToMany(Groups , {through : 'Groupuser' , foreignKey : 'id'}) ;
Groups.belongsToMany(usermodel, {
    as: "admin",
    through: "GroupAdmin",
    onDelete: "CASCADE",
  });


app.use('/user' , userroute) ;
app.use('/chat' , chatroute ) ;
app.use('/group' , grouproute) ;




(
    async ()=>{
        try {
         await sequelize.sync(
            //{alter: true}
            ) 
         app.listen(5000 , ()=>{
            console.log("listening to port 5000")
         }) 
        }
        catch(err) {
        
            console.log(err) ;
        }
    }  
)
() 
