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

 groupelm.appendChild(newbtn) ;
 
 //grpdiv.appendChild(groupelm) ;
newbtn.addEventListener('click' ,getchats ) ;
newbtn.addEventListener('click' , getcurrentusers) ;

}
const allusersbtn = document.getElementById('showallusers') ;
allusersbtn.addEventListener('click' , getallusers)
async function getallusers(e) {
    try {
        e.preventDefault() ;
        const res = await axios.get('http://localhost:5000/group/getallusers' ,{headers : {"Authorization" : token} } ) ;
        
        const userListElement = document.getElementById('showalluserslist')
        for(let i = 0 ;i<res.data.users.length ; i++) {
          let users = res.data.users
          userListElement.innerHTML = '';
           // showuser(users[i]) ;
           users.forEach(user => {
            // Create elements for displaying user name and "Add" button
            const userContainer = document.createElement('div');
            userContainer.className = 'user-container';
        
            const userNameElement = document.createElement('span');
            userNameElement.innerText = user.name;
        
            const addButton = document.createElement('button');
            addButton.innerText = 'Add';
            addButton.id = user.id ;
            console.log(addButton) ;
            addButton.addEventListener('click', addUserToGroup); // Assuming you have a function to handle adding users to the group
        
            // Append elements to the user container
            userContainer.appendChild(userNameElement);
            userContainer.appendChild(addButton);
        
            // Append the user container to the user list
            userListElement.appendChild(userContainer);
        });
            
        }
        
    }
    catch(err) {
        console.log(err) ;
    }
 
  
}
async function getcurrentusers(e) {
    e.preventDefault() 
    try {
        
        const resp = await axios.get("http://localhost:5000/group/showparticipant" , {
            headers : {
                "Authorization" : token ,
                "group_id" : e.target.id
            } 
        })
        console.log("reesp is =>"+JSON.stringify(resp)) ;
        const currentUsersList = document.getElementById('currentUsersList');
    currentUsersList.innerHTML = ''; // Clear previous contents

    resp.data.participants.forEach(user => {
      const userItem = document.createElement('li');
      //userItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      
      const userName = document.createElement('span');
      userName.innerText = user.name;
      
      const addButton = document.createElement('button');
      addButton.className = 'btn btn-primary btn-sm';
      addButton.innerText = 'Make Admin';
      addButton.id = user.id;
      addButton.addEventListener('click', makeadmin);
      const delbtn = document.createElement('button') ;
      delbtn.innerText = 'X' ;
      delbtn.id = user.id ;
     delbtn.addEventListener('click' , deluser) ;
      
      userItem.appendChild(userName);
      userItem.appendChild(addButton);
      userItem.appendChild(delbtn) ;

      currentUsersList.appendChild(userItem);
    });

    }
    catch(err) {
        console.log(err) ;
    }
}




async function addUserToGroup(e) {
e.preventDefault() ;
try {
    console.log(e.target.id) ;
    const group_id = localStorage.getItem('groupid') ;
    const user_id = e.target.id
    const user_detail = {
        group_id ,
        user_id
    }
    await axios.post('http://localhost:5000/group/adduser' , user_detail , {headers : {"Authorization" : token} })
}
catch(err) {
    console.log(err) ;

}

}

async function makeadmin(e) {
    e.preventDefault() ;
    try {
        const participant_id = e.target.id ;
        const group_id = localStorage.getItem('groupid') ;
        const detail = {
            participant_id , group_id
        }
        const resp = await axios.post('http://localhost:5000/group/addadmin' , detail ,{headers : {"Authorization" : token} } ) ;
        console.log(resp) ;
        alert(resp.data.messege) ;

    } catch (err) {

        console.log(err)
     alert(err.response.data.message) ; 
    }
}
async function deluser(e) {
    e.preventDefault() ;
    try {
        console.log("hello") ;
        const participant_id = e.target.id ;
        const group_id = localStorage.getItem('groupid') ;
        const detail = {
            participant_id , group_id
        }
        const resp = await axios.post('http://localhost:5000/group/removeuser' , detail ,{headers : {"Authorization" : token} } ) ;
        console.log(resp) ;
        alert(resp.data.message) ;
        window.location.reload ;
    } catch (err) {
        console.log(err) ;
        alert(err.response.data.messege)
    }
}