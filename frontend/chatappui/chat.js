const token = localStorage.getItem('token') ;
const name = localStorage.getItem('name') ;

const sendbtn = document.getElementById('sendbtn') ;
sendbtn.addEventListener('click' , sendmsg) ;

window.addEventListener('DOMContentLoaded' , getchats) ;

async function sendmsg(e) {
   try{
    e.preventDefault() ;
    console.log(1) ;
    const chat = document.getElementById('messageInp').value ;
    
    const chat_detail = {
        name , chat
    }
    const res = await axios.post('http://localhost:5000/chat/savechat' ,chat_detail , {headers : {"Authorization" : token} } )
if (res.status==200) {
    console.log("chat sent") ;

}
else throw new Error(res.data.messege)
   }
   catch(err) {
    console.log(err) ;
    alert(err.response.data.messege) ;
   }
}
async function getchats() {
try {
const response = await axios.get('http://localhost:5000/chat/getchat' , {headers : {"Authorization" : token} })
console.log(response.data.chats)
for(let i=0 ;i<response.data.chats.length; i++) {
    showchats(response.data.chats[i]) ;

}
}
catch(err) {
    console.log(err)
}
}

async function showchats(chatdetail) {
    const messageContainer = document.querySelector(".container")
    const messageElement = document.createElement('div');
   // messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.appendChild(document.createTextNode(`${chatdetail.name} : ${chatdetail.chat}`))
    messageContainer.append(messageElement);
}

const creategrpbtn = document.getElementById('creategrpbtn') ;
creategrpbtn.addEventListener('click' , creategroup) ;

async function creategroup(e) {
try {
e.preventDefault() ;
const group_name = window.prompt("Please enter the group name:");
const group_detail = {
    group_name , name 
}
const resp = await axios.post('http://localhost:5000/group/create' , group_detail , {headers : {"Authorization" : token} }) ;
console.log(resp) ;
}
catch(err) {
    console.log(err) ;
}
}