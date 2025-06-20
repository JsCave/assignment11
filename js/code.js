const userName=document.getElementById('userName')
const userEmail=document.getElementById('userEmail')
const userPassword=document.getElementById('userPassword')
const successAlert=document.getElementById('success')
const errorAlert=document.getElementById('alert')

let users=[]

function validation(page){   //validate entries
  const emailRegex=  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
  const passwordRegex = /^[a-zA-Z0-9@!_+-]{6,16}$/;
  let isValidEmail=emailRegex.test(userEmail.value.trim());
  let isValidUsername=usernameRegex.test(userName.value.trim());
  let isValidPassword=passwordRegex.test(userPassword.value.trim());
  if(page=='signUp'){ if(isValidEmail&&isValidUsername&&isValidPassword){ return true;}else {return false}}
  if(page=='signIn'){ if(isValidEmail&&isValidPassword) { return true;}else {return false}}
}

function search(){ //search if user exist before
let findName=users.find(function(person){ 
return person.username.toLowerCase()==userName.value.toLowerCase() || person.email.toLowerCase()==userEmail.value.toLowerCase()
});
return findName !== undefined;
}

function signUp(page){    
  successAlert.style.display='none'
  errorAlert.style.display='none'
let validationResult=validation(page)
let searchResult=search()
console.log(searchResult)
if(validationResult && !searchResult){
  let newUser={
    username:userName.value,
    password:userPassword.value,
    email:userEmail.value
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





/*
if(localStorage.getItem("sitesList") !==null){
    list=JSON.parse(localStorage.getItem("sitesList"))
    handleDisplay()
}

function handleDisplay(){
    var temp=""
    for(var i=0;i<list.length;i++){
        temp+=`<tr><td>`+list[i].id+`</td><td>`+list[i].name+`</td><td><button class="btn btn-success" onclick="handleUrl(`+i+`)"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td><td><button class="btn btn-danger" onclick="handleDelete(`+i+`)"><i class="fa-solid fa-trash-can"></i> Delete</button></td></tr>`
    }
    records.innerHTML=temp
}

function handleAdd(){

        const pattern = new RegExp(
          '^([a-zA-Z]+:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
          'i'
        );
        var isValidUrl=pattern.test(site.value.trim());
      if(isValidUrl && recordName.value!==""){
        var newSite={
            id:list.length+1,
            name:recordName.value,
            site:site.value
        }
        list.push(newSite)
        localStorage.setItem('sitesList',JSON.stringify(list))
        handleDisplay()
      }else{
warnBox.style.display="block"
      }
}
    

function handleDelete(index){
  list.splice(index,1)
  localStorage.setItem('sitesList',JSON.stringify(list))
  handleDisplay()
}

function normalizeUrl(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return 'http://' + url;
  }
  return url;
}

function handleUrl(index){
  window.open(normalizeUrl(list[index].site));
}

function closeBox(){
  warnBox.style.display="none"
}
  */