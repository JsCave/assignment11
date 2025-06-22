const userName=document.getElementById('userName')
const userEmail=document.getElementById('userEmail')
const userPassword=document.getElementById('userPassword')
const successAlert=document.getElementById('success')
const errorAlert=document.getElementById('alert')
const intro=document.getElementById('intro')

let users=[]
if(localStorage.getItem('users')){
  users=JSON.parse(localStorage.getItem('users'))
}
function validation(page){   //validate entries
  const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
  const passwordRegex = /^[a-zA-Z0-9@!_+-]{6,16}$/;
  let isValidEmail=emailRegex.test(userEmail.value.trim());
  if(page=='signUp') {let isValidUsername=usernameRegex.test(userName.value.trim());}
  let isValidPassword=passwordRegex.test(userPassword.value.trim());
  if(page=='signUp'){ if(isValidEmail&&isValidUsername&&isValidPassword){ return true;}else {return false}}
  if(page=='signIn'){ if(isValidEmail&&isValidPassword) { return true;}else {return false}}
}

function search(page){ //search if user exist before
  if(page=='signUp'){
let findName=users.find(function(person){ 
return person.username.toLowerCase()==userName.value.toLowerCase().trim() || person.email.toLowerCase()==userEmail.value.toLowerCase().trim()
});
return findName !== undefined;
  }
  if(page=='signIn'){
    let findName=users.find(function(person){ 
      return person.password==userPassword.value && person.email.toLowerCase()==userEmail.value.toLowerCase().trim()
      });
      return findName !== undefined;
  }


}

function signUp(page){    
  successAlert.style.display='none'
  errorAlert.style.display='none'
let validationResult=validation(page)
let searchResult=search(page)
console.log(searchResult)
if(validationResult && !searchResult){
  let newUser={
    username:userName.value.trim(),
    password:userPassword.value.trim(),
    email:userEmail.value.trim()
  }
  users.push(newUser)
  localStorage.setItem('users',JSON.stringify(users))
  successAlert.style.display='block'
}else if(!validationResult){ errorAlert.innerHTML="kindly sure you inserted right email,username & valid password"; errorAlert.style.display='block';}
else if(searchResult){ errorAlert.innerHTML="username or email already taken";errorAlert.style.display='block';}
else{
 errorAlert.innerHTML="kindly sure from your input";errorAlert.style.display='block';
}
}


function signIn(page){    
  errorAlert.style.display='none'
let validationResult=validation(page)
let searchResult=search(page)
if(validationResult && searchResult){
  let findName=users.find(function(person){ 
    return person.username
    });
localStorage.setItem("sessionName",findName.username)
window.location.replace("home.html");
}else if(!validationResult){ errorAlert.innerHTML="kindly sure you inserted right email pattern & valid password"; errorAlert.style.display='block';}
else if(!searchResult){ errorAlert.innerHTML="sure from email or password";errorAlert.style.display='block';}
else{
 errorAlert.innerHTML="kindly sure from your input";errorAlert.style.display='block';
}

}

if(localStorage.getItem('sessionName')){
  let loggedUser=localStorage.getItem('sessionName').toUpperCase()
  intro.innerHTML=`welcome ${loggedUser}`
}

