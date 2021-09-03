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
function getledstatus(cl) {
    console.log("div name ");
    console.log(cl.id);
    // console.log(folderheader);
    fetch('/getledstatus?id=' + cl.id).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log("Error");
            } else {
                // console.log(data.Status);
                text=data.Status;
                // var note_title=data.title;
                // document.querySelector('.fr-placeholder').innerHTML='';
                // document.querySelector('#deskmainarea').childNodes[1].innerHTML='';
                // document.querySelector('.fr-element').insertAdjacentHTML('afterbegin', text);
                // document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].innerHTML='';
                // document.querySelector('.notename').value=note_title;
                // document.querySelector('#deskmainarea'+cl.id).childNodes[1].childNodes[2].childNodes[0].placeholder='';
                // .childNodes[1].childNodes[2].childNodes[1].innerHTML;after for payment is showing
                
                document.querySelector('#status'+cl.id).insertAdjacentHTML('afterbegin',"Current Switch Status "+text);
            }
        })
    })
}


function getuserimg(){
    fetch('/imgurl').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log("Error");
            } else {
                console.log("Working");
                // console.log(data);
                var wel=data.name;
                var img=`<img src="${data.imgurl}" width="30" height="30" class="d-inline-block align-top"alt="">`
                document.querySelector('#userimg').insertAdjacentHTML('afterbegin',img+" "+wel)
                // document.querySelector('#userimg').insertAdjacentHTML('beforeend',img)
            }
        })
    })
}

function onswitch(cl) {
    console.log("div name ");
    console.log(cl);
    // console.log(folderheader);
    var curroom=cl,status="ON";
    postData('/myled', {curroom,status}).then((data)=>{
        if(data.bad)
        {
            console.log("Got Error ")
        }
        else
        {
            console.log(data);
            // document.querySelector('#status'+cl).innerHTML='';
            // document.querySelector('#status'+cl).insertAdjacentHTML('afterbegin', ' Data Saved!!');
            window.location.reload();
        }
        
}) 
}

function offswitch(cl) {
    console.log("div name ");
    console.log(cl);
    // console.log(folderheader);
    var curroom=cl,status="OFF";
    postData('/myled', {curroom,status}).then((data)=>{
        if(data.bad)
        {
            console.log("Got Error ")
        }
        else
        {
            console.log(data);
            // document.querySelector('#status'+cl).innerHTML='';
            // document.querySelector('#status'+cl).insertAdjacentHTML('afterbegin', data);
            window.location.reload();
        }
        
}) 
}