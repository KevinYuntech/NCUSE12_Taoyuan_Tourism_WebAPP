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
                "<td class='spot_id'>"+spotList[index].Id+"</td>"+
                "<td>" +spotList[index].Name+"</td>" +
                "<td>" +spotList[index].Address+"</td>" +
                "<td>" +spotList[index].Description+"</td>" +
                "<td>" +"<button>新增行程</button>"+"</td>" +
                "<td>" +"<button class=view_spot_detail_info>查看詳細資料</button>"+"</td>"
                "</tr>";

                $('#SpotListTable').append(spot_str);
            }

            $('.view_spot_detail_info').click(function (e) { 
                e.preventDefault();
                let id = $(this).parent('td').parent('tr').find('.spot_id').text();
                window.location = "SearchSpotPageById?Id="+id;
            });            
        }
    });
});

//
//load current user status
let userId;
loadLoginUser();
console.log(userId);

$(document).ready(function () {

    $('.view_spot_detail_info').click(function (e) { 
        e.preventDefault();
        alert('測試');
    });

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
    $('#addplaceform').submit(function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form
        let create_status = false;

        let Name = $('#placeinput').val();
        let Zipcode = $('#numberinput').val();
        let Address = $('#addressinput').val();
        let Opentime = $('#timearea').val();
        let Description = $('#descriptionarea').val();
        
        let file = $('#uploadImage')[0].files[0] // 單個檔案
        let formData = new FormData(this);
        formData.append('image', file);
        console.log(file);

            let info = {
                Name : Name,
                Zipcode : Zipcode,
                Address : Address,
                Opentime : Opentime,
                Description : Description,
            }

            if(Name.length && Zipcode.length && Opentime.length && Address.length)
            {
                $.ajax({
                    type: "post",
                    url: "../CreateSpot/CreateSpotInfo",
                    data: info,
                    dataType: "json",
                    success: function (response) {
                        //parse json
                        var returnedData = JSON.parse(response.message);
                        create_status = returnedData.StatusMessage;
                       if (create_status === false) {
                        alert(create_status);
                        console.log(returnedData.Data.ModelStateErrors);
                       }
                       else{
                        
                        $.ajax({
                            type: "POST",
                            url: "../CreateSpot/UploadSpotImg",
                            data: formData,
                            contentType: false,
                            processData: false,
                            mimeType: 'multipart/form-data',
                            dataType: "JSON",
                            success: function (response) {
                                var returnedData = JSON.parse(response.message);
                                create_status = returnedData.StatusMessage;
                                console.log(create_status);

                            }
                        });
                       }
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
            url: "~/Account/GetLoginUser",
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