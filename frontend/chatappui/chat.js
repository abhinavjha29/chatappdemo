const token = localStorage.getItem('token') ;

const sendbtn = document.getElementById('sendbtn') ;
sendbtn.addEventListener('click' , sendmsg) ;

async function sendmsg(e) {
   try{
    e.preventDefault() ;
    console.log(1) ;
    const chat = document.getElementById('messageInp').value ;
    const name = localStorage.getItem('name') ;
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