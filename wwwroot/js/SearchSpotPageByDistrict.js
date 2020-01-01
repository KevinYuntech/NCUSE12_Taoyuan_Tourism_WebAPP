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
                    "<td class='spot_id'>" + spotList[index].Id + "</td>" +
                    "<td>" + spotList[index].Name + "</td>" +
                    "<td>" + spotList[index].Address + "</td>" +
                    "<td>" + spotList[index].Description + "</td>" +
                    "<td>" + "<button class=add_itinerary>新增行程</button>" + "</td>" +
                    "<td>" + "<button class=view_spot_detail_info>查看詳細資料</button>" + "</td>"
                "</tr>";

                $('#SpotListTable').append(spot_str);
            }

            $('.view_spot_detail_info').click(function (e) {
                e.preventDefault();
                let id = $(this).parent('td').parent('tr').find('.spot_id').text();
                window.location = "SearchSpotPageById?Id=" + id;
            });

            $('.add_itinerary').click(function (e) {
                if (userId === null || userId === undefined || userId === '') {
                    window.location = "../Identity/Account/Login"
                }
                else{
                    let Name = $('#placeinput').val();
                    let Spot_Id = $(this).parent('td').parent('tr').find('.spot_id').text();
                    console.log(Spot_Id);
                    var spot_list = {
                        Spot_Id: Spot_Id
                    };
                    $.ajax({
                        type: "post",
                        url: "../AddItinerary/AddItineraryBySpot_Id",
                        data: spot_list,
                        async: false,
                        dataType: "json",
                        success: function (response) {
                            alert(response.status)
    
                            alert("目前新增數量" + response.message);
                        }
                    });
                }
            });
        }
    });


});



$(document).ready(function () {

    $('#create_spot_btn').click(function () {
        if (userId === null || userId === undefined || userId === '') {
            window.location = "../Identity/Account/Login"
        } else {
            $('.addplaceform').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');
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
            Name: Name,
            Zipcode: Zipcode,
            Address: Address,
            Opentime: Opentime,
            Description: Description,
            UserId: userId
        }

        if (Name.length && Zipcode.length && Opentime.length && Address.length) {
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
                    } else {

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
                                alert(create_status);

                            }
                        });
                    }
                }
            });
        } else {
            alert("尚有未輸入資料!!");
        }


    });

    $('#view_Itneary_btn').click(function (e) { 
        e.preventDefault();
        
        if (userId === null || userId === undefined || userId === '') {
            window.location = "/Identity/Account/Login"
        }
        else{
            window.location = "/SearchItinerary/MySearchItinerary";
        }
    });    
});



function addplaceclose() {
    console.log("close a dialog");
    document.getElementById('addplaceform').style.display = "none";
}