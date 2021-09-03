document.querySelector(".loginbutton").addEventListener('click',(event)=>{
    event.preventDefault();
    console.log("Log in Working");
    email=document.querySelector(".email").value;
    password=document.querySelector(".password").value;
})
