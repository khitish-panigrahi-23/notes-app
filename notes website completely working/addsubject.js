async function postData(url = '', data = {}) {
    // Default options are marked with *
                const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                return response.json(); // parses JSON response into native JavaScript objects
}
function addcompany(){
    var subjecttitle=document.querySelector(".subjectname").value.toLowerCase();
    // console.log("hi "+companytitle);
    // console.log("hi "+yeartitle);
    if((subjecttitle==="")){
        document.querySelector('#status').innerHTML='';
        document.querySelector('#status').insertAdjacentHTML('afterbegin', ' Give Subject Name!!');
    }
    else{
       
        // console.log(body_text);
        subjecttitle = subjecttitle.replace(/\s+/g, "");
        postData('/addsubject', {subjecttitle}).then((data)=>{
                if(data.bad)
                {
                    console.log("Got Error ")
                }
                else
                {
                    // console.log(data);
                    document.querySelector('#status').innerHTML='';
                    document.querySelector('#status').insertAdjacentHTML('afterbegin', ' <img src="static/img/checked.png" alt="" width="50" height="50">');
                    window.location.reload();
                }
        })
    }
}


function adddate(){
    var addnewdate=document.querySelector(".newdate").value.toLowerCase();
    var subjecttitle=document.querySelector(".subjecthead").textContent;
    // console.log("hi sub "+subjecttitle);
    // console.log("hi date "+addnewdate);
    if((addnewdate==="")){
       alert("Give a date before submitting!");
        // document.querySelector('#status').insertAdjacentHTML('afterbegin', ' Give a date before submitting!');
    }
    else{
       
        // console.log(body_text);
        subjecttitle = subjecttitle.replace(/\s+/g, "");
        addnewdate = addnewdate.replace(/\s+/g, "");
        postData('/adddate', {subjecttitle,addnewdate}).then((data)=>{
                if(data.bad)
                {
                    console.log("Got Error ")
                }
                else
                {
                    // console.log(data);
                    document.querySelector('#status').innerHTML='';
                    document.querySelector('#status').insertAdjacentHTML('afterbegin', ' <img src="static/img/checked.png" alt="" width="50" height="50">');
                    window.location.reload();
                }
        })
    }
}