
const loginbtn = document.getElementById('loginbtn') ;
loginbtn.addEventListener('click' , login) ;
async function login(e) {
    try {
        e.preventDefault() ;
        const name = document.getElementById('Name').value ;
        const phonenumber = document.getElementById('Phone').value ;
        const password = document.getElementById('password').value ;
        const logindetail = {
            phonenumber ,
            password ,
        }
        const res = await axios.post('http://localhost:5000/user/login' , logindetail)
        if(res.status==200) {
        localStorage.setItem("name" , name)    
        localStorage.setItem("token" , res.data.token)
            alert(res.data.messege)
            window.location.href="http://127.0.0.1:5500/frontend/chatappui/index.html"
        }
     else {
        console.log(res.data.messege) ; 
        throw new Error(res.data.messege);
   
    }
    }

    catch(err) {
       // console.log(err.messege) ;
       console.log(err) ;
        alert(err.response.data.messege)
       // alert("something went wrong")
    }
    
}

const signuppagebtn = document.getElementById('createAccountBtn') 
signuppagebtn.addEventListener('click' , signuppage) 
async function signuppage(e) {
    e.preventDefault() ;
    window.location.href = 'http://127.0.0.1:5500/frontend/signup/signup.html' ;
}