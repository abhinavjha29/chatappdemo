

const signupbtn = document.getElementById('signupbtn') ;

signupbtn.addEventListener('click' , submitdetail) ;

async function  submitdetail(e) {
    try {
        e.preventDefault() ;
        const name = document.getElementById('name').value ;
        const email = document.getElementById('email').value ;
        const password = document.getElementById('password').value ;
        const phonenumber = document.getElementById('phone').value ;
        const user_detail = {
            name , email , password , phonenumber 
        } ;
        let resp = await axios.post('http://localhost:5000/user/save' , user_detail) ;
        if(resp.status==201) {
console.log(resp.data.msg) ;
alert(resp.data.msg)
        }
else {
    console.log(err) ;
    alert(resp.data.msg)
}
    }
    catch(err) {
        console.log(err) ;
        alert("something went wrong") ;
    }


}