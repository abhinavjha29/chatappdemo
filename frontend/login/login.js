
const loginbtn = document.getElementById('loginbtn') ;
loginbtn.addEventListener('click' , login) ;
async function login(e) {
    try {
        e.preventDefault() ;
        const phonenumber = document.getElementById('Phone').value ;
        const password = document.getElementById('password').value ;
        const logindetail = {
            phonenumber ,
            password
        }
        const res = await axios.post('http://localhost:5000/user/login' , logindetail)
        if(res.status==200) {
            console.log("success") ;
            alert(res.data.messege)
        }
       // else throw new Error(res.data.messege);
    else {
        alert(res.data.messege) ;
    }
    }

    catch(Error) {
        console.log(Error.messege) ;
        alert("something went wrong")
    }
    
}

const signuppagebtn = document.getElementById('createAccountBtn') 
signuppagebtn.addEventListener('click' , signuppage) 
async function signuppage(e) {
    e.preventDefault() ;
    window.location.href = 'http://127.0.0.1:5500/frontend/signup/signup.html' ;
}