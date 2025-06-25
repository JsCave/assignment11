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
let errors=[]
function validation(page){   //validate entries
  const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
  const passwordRegex = /^[a-zA-Z0-9@!_+-]{6,16}$/;
  let isValidEmail=emailRegex.test(userEmail.value.trim());
  let isValidUsername=""
  if(page=='signUp') {isValidUsername=usernameRegex.test(userName.value.trim());}
  let isValidPassword=passwordRegex.test(userPassword.value.trim());
  if(page=='signUp'){ if(isValidEmail&&isValidUsername&&isValidPassword){ return true;}else {     
    if(!isValidUsername){errors.push('username not valid<br>')}
    if(!isValidEmail){errors.push('email not valid<br>')}
    if(!isValidPassword){errors.push('password not valid<br>')}
    return false}}
  if(page=='signIn'){ if(isValidEmail&&isValidPassword) { return true;}else {
    if(!isValidEmail){errors.push('email not valid<br>')}
    if(!isValidPassword){errors.push('password not valid<br>')}
    return false}}
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
  window.location.replace("index.html");
  //successAlert.style.display='block'
}else if(!validationResult){  handleErrors(errors)}
else if(searchResult){ 
  let findName = users.find(function(person) {
    return person.username == userName.value;
  });
  let findEmail = users.find(function(person) {
    return person.email == userEmail.value;
  });
if(findName !== undefined){errors.push('username already taken')}
if(findEmail !== undefined){errors.push('email already taken')}

  handleErrors(errors)
}
else{
  errors.push("kindly sure from your input")
 handleErrors(errors)
}
}


function signIn(page){    
  errorAlert.style.display='none'
let validationResult=validation(page)
let searchResult=search(page)
if(validationResult && searchResult){
  let findName=users.find(function(person){ 
    return person.email.toLowerCase()==userEmail.value.toLowerCase().trim()
    });
localStorage.setItem("sessionName",findName.username)
window.location.replace("home.html");
}else if(!validationResult){ handleErrors(errors)}
else if(!searchResult){ 
  let findPassword = users.find(function(person) {
    return person.password == userPassword.value;
  });
  let findEmail = users.find(function(person) {
    return person.email == userEmail.value;
  });
if(findName !== undefined){errors.push('username already taken')}
if(findEmail !== undefined){errors.push('email already taken')}

  handleErrors(errors)
}
else{
  errors.push("kindly sure from your input");
 handleErrors(errors)
}

}

if(localStorage.getItem('sessionName')){
  let loggedUser=localStorage.getItem('sessionName').toUpperCase()
  intro.innerHTML=`welcome ${loggedUser}`
}

function logout(){
  if(localStorage.getItem('sessionName')){
localStorage.removeItem('sessionName')
    window.location.replace("index.html");
  }
}

function handleErrors(list){
  let temp=''

  for(let i=0;i<list.length;i++){
temp+=list[i]
  }
  errorAlert.innerHTML=temp;
  errorAlert.style.display='block';
  errors=[];
}
