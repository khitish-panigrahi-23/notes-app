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
    
    function myFunction(cl) {
        // console.log("Div name");
        // console.log(cl);
                // var desktitle=document.querySelector("#"+cl).value;
                var desktitle=cl;
                desktitle=desktitle.split(" ").join("");
                var body_text = document.querySelector('#deskmainarea'+cl).childNodes[1].childNodes[2].childNodes[0].innerHTML //offline re last ta zero online re last ta 1;
               // var body_text = document.querySelector('#deskmainarea'+cl).childNodes[1].childNodes[2].childNodes[1].innerHTML;
                // console.log(body_text);
                postData('/editnote', {desktitle,body_text}).then((data)=>{
                        if(data.bad)
                        {
                            console.log("Got Error ")
                        }
                        else
                        {
                            // console.log(data);
                            document.querySelector('#status'+cl).innerHTML='';
                            document.querySelector('#status'+cl).insertAdjacentHTML('afterbegin', ' <img src="static/img/checked.png" alt="" width="50" height="50">');
                            window.location.reload();
                        }
                        
                }) 
            }

            function mycheckFunction(curtitle){
                curtitle=curtitle.toUpperCase();
                curtitle=curtitle.split(" ").join("");
                console.log("mycheckFunction called with value : "+curtitle);
                postData('/verifytitle', {curtitle}).then((data)=>{
                    console.log("data.avail "+data.avail);
                    if(data.avail)
                    {
                        console.log("Got Error ")
                        alert('Note Title Exists!!, Pls give a new title');
                        document.querySelector(".notename").value="";
                    } 
            }) 
        }

        function mycheckFunctionfolder(curtitle){
            curtitle=curtitle.toUpperCase();
            curtitle=curtitle.split(" ").join("");
            console.log("mycheckFunction called with value : "+curtitle);
            postData('/verifytitlefolder', {curtitle}).then((data)=>{
                console.log("data.avail "+data.avail);
                if(data.avail)
                {
                    console.log("Got Error ")
                    alert('Note Title Exists!!, Pls give a new title');
                    document.querySelector(".foldername").value="";
                    document.querySelector(".notename").value="";
                } 
        }) 
    }

    function mycheckFunctionfoldernotes(curtitle){
        curtitle=curtitle.toUpperCase();
        curtitle=curtitle.split(" ").join("");
        console.log("verifytitlefoldernotes called with value : "+curtitle);
        postData('/verifytitlefoldernotes', {curtitle}).then((data)=>{
            console.log("data.avail "+data.avail);
            if(data.avail)
            {
                console.log("Got Error ")
                alert('Note Title Exists!!, Pls give a new title');
                document.querySelector(".notename").value="";
            } 
    }) 
}