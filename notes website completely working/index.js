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


// fetch('/notes').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log("Error");
//         } else {
//             console.log(data);
//             text=data.Status;
//             var note_title=data.title;
//             // document.querySelector('.fr-placeholder').innerHTML='';
//             // document.querySelector('#deskmainarea').childNodes[1].innerHTML='';
//             // document.querySelector('.fr-element').insertAdjacentHTML('afterbegin', text);
//             // document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].innerHTML='';
//             document.querySelector('.notename').value=note_title;
//             document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].insertAdjacentHTML('afterbegin', text);
//         }
//     })
// })

// addbutton.addEventListener('click', event => {
//     // fr-element
//     var desktitle=document.querySelector(".notename").value;
//     var body_text = document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[1].innerHTML;
//     console.log(body_text);
//     postData('/', {desktitle,body_text}).then((data)=>{
//             if(data.bad)
//             {
//                 console.log("Got Error ")
//             }
//             else
//             {
//                 // console.log(data);
//                 document.querySelector('#status').innerHTML='';
//                 document.querySelector('#status').insertAdjacentHTML('afterbegin', ' Data Saved!!');
//                 location.href =`/newperfect`;
//             }
//     })
//     // console.log(body_text);
//   });

  function firstbutton() {
    var desktitle=document.querySelector(".notename").value;
    // console.log("hi "+desktitle);
    if((desktitle)===""){
        document.querySelector('#status').innerHTML='';
        document.querySelector('#status').insertAdjacentHTML('afterbegin', ' Give note a title!!');
    }
    else{
        var body_text = document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].innerHTML;
        // console.log(body_text);
        desktitle = desktitle.split(" ").join("");
        postData('/', {desktitle,body_text}).then((data)=>{
                if(!data.success)
                {
                    console.log("Got Error ");
                    
                }
                else
                {
                    // console.log(data);
                    document.querySelector('#status').innerHTML='';
                    document.querySelector('#status').insertAdjacentHTML('afterbegin', ' <img src="static/img/checked.png" alt="" width="50" height="50">');
                      location.href =`/newperfect`;
                }
        })
    }
}