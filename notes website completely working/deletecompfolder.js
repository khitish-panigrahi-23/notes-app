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
    
    function deletecompfolderfun() {
        // console.log("Div name");
        // console.log(cl);
        // console.log("Fold name");
        foldname=document.querySelector('.folderhead').innerText.toLowerCase();
        // console.log(foldname);
                // var desktitle=document.querySelector("#"+cl).value;
                // var body_text = document.querySelector('#deskmainarea'+cl).childNodes[1].childNodes[2].childNodes[0].innerHTML oofline re last ta zero online re last ta 1;
                postData('/delcompfolder', {foldname}).then((data)=>{
                        if(data.bad)
                        {
                            console.log("Got Error ")
                        }
                        else
                        {
                            // console.log(data);
                            // document.querySelector('#status'+cl).innerHTML='';
                            // document.querySelector('#status'+cl).insertAdjacentHTML('afterbegin', ' Data Saved!!');
                            location.href =`/addfolder`;
                        }
                        
                }) 
            }