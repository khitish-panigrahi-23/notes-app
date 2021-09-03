var text=`Hi`;
// document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].style.backgroundColor = rgb(235, 235, 235) !important;
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
  function firstfolderbutton() {
    var desktitle=document.querySelector(".notename").value;
    var foldertitle=document.querySelector(".foldername").value.toLowerCase();;
    // console.log("hi "+desktitle);
    // console.log("hi "+foldertitle);
    if((desktitle==="")||(foldertitle==="")){
        document.querySelector('#status').innerHTML='';
        document.querySelector('#status').insertAdjacentHTML('afterbegin', ' Give Folder and Note title!!');
    }
    else{
        // var body_text = document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[1].innerHTML;
        var body_text = document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].innerHTML;
        // console.log(body_text);
        desktitle = desktitle.replace(/\s+/g, "");
        foldertitle = foldertitle.replace(/\s+/g, "");
        postData('/addfolder', {desktitle,body_text,foldertitle}).then((data)=>{
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

function firstnotefolderbutton() {
    var desktitle=document.querySelector(".notename").value;
    var foldertitle=document.querySelector('.folderhead').innerText.toLowerCase();
    console.log("hi "+desktitle);
    console.log("hi "+foldertitle);
    if((desktitle==="")||(foldertitle==="")){
        document.querySelector('#status').innerHTML='';
        document.querySelector('#status').insertAdjacentHTML('afterbegin', ' Give Folder and Note title!!');
    }
    else{
        // var body_text = document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[1].innerHTML;
        var body_text = document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].innerHTML;
        // console.log(body_text);
        desktitle=desktitle.split(" ").join("");
        foldertitle = foldertitle.split(" ").join("");
        postData('/addfolder', {desktitle,body_text,foldertitle}).then((data)=>{
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