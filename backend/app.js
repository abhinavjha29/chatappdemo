const Express = require('express') ;
const bodyparser = require('body-parser') ;
const cors = require('cors') ; 

const userroute = require('./router/signuproute') ;
const sequelize = require('./util/database');
const chatroute = require('./router/chatroute') ;
const chatmodel = require('./model/chatmodel') ;
const usermodel = require('./model/signupdetail') ;
const Groupuser = require('./model/groupuser') ;
const Groups = require('./model/groupmodel');
const grouproute = require('./router/grouprote') ;
const app = Express() ;
app.use(bodyparser.json()) ;
app.use(cors({
    origin : '*'
})) ;

app.use('/user' , userroute) ;
app.use('/chat' , chatroute ) ;
app.use('/group' , grouproute) ;
usermodel.hasMany(chatmodel) ;
chatmodel.belongsTo(usermodel) ;
Groups.belongsToMany(usermodel , {through : Groupuser , foreignKey: 'group_id'}) ;
usermodel.belongsToMany(Groups , {through : Groupuser , foreignKey : 'id'}) ;


(
    async ()=>{
        try {
         await sequelize.sync() 
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
