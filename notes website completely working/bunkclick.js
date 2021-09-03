function creategraph(){
    var totabsent=document.querySelector("#absentdata").innerText;
    var totprst=document.querySelector(".totalpresent").value;
    if(totprst===""){
        alert("Give total Classes to show analysis");
    }
    else{
        let presntdata=[];
    console.log(totabsent);
    console.log(totprst);
                    presntdata.push(totabsent);
                    presntdata.push(totprst);
                    const ctx = document.getElementById('myChart').getContext('2d');
                    data = {
                    datasets: [{
                        data: presntdata,
                        label:"Random",
                        backgroundColor:[
                            "red",
                            "green",
                        ]
                    }],
                    labels: [
                        'Absent',
                        'Present'
                    ]
                    };
                    var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: data,
                    // options: options
                    })
    }
}