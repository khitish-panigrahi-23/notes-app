function getfolderdetails(cl) {
    // console.log("div name ");
    // console.log(cl.id);
    var folderheader=document.querySelector('.folderhead').innerText.toLowerCase();
    // console.log(folderheader);
    fetch('/eachfolder?id=' + cl.id+"&foldname="+folderheader).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log("Error");
            } else {
                // console.log(data.Status);
                var els=document.querySelectorAll('.fr-placeholder').length;
                for(var i = 0; i < els; i++)
                {
                    document.querySelectorAll('.fr-placeholder')[i].innerHTML=""
                }
                text=data.Status;
                // var note_title=data.title;
                // document.querySelector('.fr-placeholder').innerHTML='';
                // document.querySelector('#deskmainarea').childNodes[1].innerHTML='';
                // document.querySelector('.fr-element').insertAdjacentHTML('afterbegin', text);
                // document.querySelector('#deskmainarea').childNodes[1].childNodes[2].childNodes[0].innerHTML='';
                // document.querySelector('.notename').value=note_title;
                // document.querySelector('#deskmainarea'+cl.id).childNodes[1].childNodes[2].childNodes[0].placeholder='';
                // .childNodes[1].childNodes[2].childNodes[1].innerHTML;after for payment is showing
                
                document.querySelector('#deskmainarea'+cl.id).childNodes[1].childNodes[2].childNodes[0].insertAdjacentHTML('afterbegin', text);
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