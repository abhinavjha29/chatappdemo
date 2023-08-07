const token = localStorage.getItem('token') ;
const name = localStorage.getItem('name') ;

const sendbtn = document.getElementById('sendbtn') ;
sendbtn.addEventListener('click' , sendmsg) ;

window.addEventListener('DOMContentLoaded' , getgroup) ;

async function sendmsg(e) {
   try{
    e.preventDefault() ;
    const groupid = localStorage.getItem("groupid") ;
    const chat = document.getElementById('messageInp').value ;
    
    const chat_detail = {
        name , chat , groupid
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
async function getchats(e) {
try {
    e.preventDefault()
    console.log(e.target.id+"btn id is ") ;
    localStorage.setItem("groupid",e.target.id) ;
const response = await axios.get(`http://localhost:5000/chat/getchat/${e.target.id}` , {headers : {"Authorization" : token} })

    for(let i=0 ;i<response.data.chats.length; i++) {
        showchats(response.data.chats[i]) ;
    
    }
   



}
catch(err) {
    alert(err.response.data.messege) ;
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
getgroup() ;
}
catch(err) {
    console.log(err) ;
}
}

async function getgroup() {
    try {
        
        const grpdetail = await axios.get('http://localhost:5000/group/getgroups' ,{headers : {"Authorization" : token} } ) 
        console.log(grpdetail) ;
        for(let i=0 ; i<grpdetail.data.groupdetail.length ; i++) {
            showgroups(grpdetail.data.groupdetail[i]) ;
        }
        

    }
    catch(err) {
        console.log(err) ;
        alert(err.response.data.messege) ;
    }
   
   

}
async function showgroups(grpdetail) {
    const newbtn = document.createElement('button') ;
 const groupelm  = document.getElementById('groupsno') ;
 const grpdiv = document.createElement('div') ;
 grpdiv.id = 'groupdiv'
 grpdiv.className = 'container-fluid' ;
 newbtn.appendChild(document.createTextNode(`${grpdetail.group_name}`)) ;
 newbtn.id = grpdetail.group_id ;
 console.log(newbtn) ;
 console.log(groupelm) ;
 groupelm.appendChild(newbtn) ;
 
 //grpdiv.appendChild(groupelm) ;
newbtn.addEventListener('click' ,getchats ) ;

}
