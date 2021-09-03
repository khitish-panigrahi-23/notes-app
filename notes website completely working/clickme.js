function clickme() {
    console.log("from getcompanydetails div name ");
    var cl="company1";
    console.log(cl);
    var companyheader="tcs"
    // console.log(companyheader);
    fetch('/eachcompany?id=' + cl+"&companyname="+companyheader).then((response) => {
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
                // document.querySelector('#status').insertAdjacentHTML('afterbegin', text);
                document.querySelector('.experienceexplain').insertAdjacentHTML('afterbegin', text);
            }
        })
    })
}

