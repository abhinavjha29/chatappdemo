const Express = require('express') ;
const bodyparser = require('body-parser') ;
const cors = require('cors') ;
const app = Express() ;
const userroute = require('./router/signuproute') ;
const sequelize = require('./util/database');
const chatroute = require('./router/chatroute') ;
const chatmodel = require('./model/chatmodel') ;
const usermodel = require('./model/signupdetail') ;
const http = require('http'); // Require the http module
const socketIO = require('socket.io'); // Require socket.io


const server = http.createServer(app); // Create an HTTP server using the express app
const io = socketIO(server); // 

const Groups = require('./model/groupmodel');
const grouproute = require('./router/grouprote') ;


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


const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})



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
