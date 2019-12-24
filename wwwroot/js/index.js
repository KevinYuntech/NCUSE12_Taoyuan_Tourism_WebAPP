//load current user status
let userId;
loadLoginUser();
console.log(userId);

$(document).ready(function () {

    $('.change a').click(function () {
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
            console.log(info);
            
            $.ajax({
                type: "post",
                url: "CreateSpot/CreateSpotInfo",
                data: info,
                dataType: "json",
                success: function (response) {
                    alert(response.message);
                }
            });
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



