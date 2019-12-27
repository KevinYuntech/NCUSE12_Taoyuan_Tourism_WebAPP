//init loading spot list
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "SearchSpotByDistrictSession",
        data: "",
        dataType: "json",
        success: function (response) {

            let data = JSON.parse(response.message);
            let spotList = data.Data;
            
            $('#title').text(response.zone);
            for (let index = 0; index < spotList.length; index++) {
                let spot_str = "<tr>" +
                "<td>"+spotList[index].Id+"</td>"+
                "<td>" +spotList[index].Name+"</td>" +
                "<td>" +spotList[index].Address+"</td>" +
                "<td>" +spotList[index].Description+"</td>" +
                "<td>" +"<button>新增行程</button>"+"</td>" +
                "</tr>";

                $('#SpotListTable').append(spot_str);
            }
            
        }
    });
});

//
//load current user status
let userId;
loadLoginUser();
console.log(userId);

$(document).ready(function () {

    $('#create_spot_btn').click(function () {
        $('.addplaceform').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
    });
    
    $('#addplace').click(function (e) { 

        
        if(userId === null || userId === undefined|| userId === ''){
            alert('請先登入');
        }
        else{
            console.log("pop a dialog");
            document.getElementById('addplaceform').style.display = "";
        }
    });

    //send spot info to backend
    $('#submit_info').click(function (e) {
            let info = {
                name : $('#placeinput').val(),
                description : $('#descriptionarea').val(),
                address : $('#addressinput').val(),
            }
            if(name.length && number.length && time.length && address.length&& description.length)
            {
                $.ajax({
                    type: "post",
                    url: "../CreateSpot/CreateSpotInfo",
                    data: info,
                    dataType: "json",
                    success: function (response) {
                        //parse json
                        var returnedData = JSON.parse(response.message);
    
                        alert(returnedData.StatusMessage);
                        console.log(returnedData.Data.ModelStateErrors);
                    }
                });
            }
            else
            {
                alert("尚有未輸入資料!!");
            } 

    });

    $('#add_itinerary').click(function (e) {
        console.log('新增行程');
        let info = {
            name : $('#placeinput').val(),
            description : $('#descriptionarea').val(),
            address : $('#addressinput').val(),
        }
        
        $.ajax({
            type: "post",
            url: "/AddItinerary/AddItinerary",
            data: info,
            async: false,
            dataType: "json",
            success: function (response) {
                alert(response.status)
                
                alert("目前新增數量"+response.message);
            }
        });
});
});


function loadLoginUser()
{   
    $(document).ready(function () {
        $.ajax({
            type: "get",
            url: "Account/GetLoginUser",
            data: "",
            dataType: "json",
            async: false,
            success: function (response) {
                userId = response.userId;
                console.log(userId);
            }
        });
    
    });
}



function addplaceclose() {
    console.log("close a dialog");
    document.getElementById('addplaceform').style.display = "none";
}