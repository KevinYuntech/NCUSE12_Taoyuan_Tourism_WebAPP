//init loading spot list

let _Zone = "";
let _Zipcode = "";

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
            _Zone = response.zone;
            console.log(_Zone);
            for (let index = 0; index < spotList.length; index++) {
                let spot_str = "<tr>" +
                    "<td class='spot_id'>" + spotList[index].Id + "</td>" +
                    "<td>" + spotList[index].Name + "</td>" +
                    "<td>" + spotList[index].Zipcode + "</td>" +
                    "<td>" + spotList[index].Address + "</td>" +
                    "<td>" + spotList[index].Description + "</td>" +
                    "<td>" + spotList[index].Opentime + "</td>" +
                    "<td>" + "<button class=add_itinerary>新增行程</button>" + "</td>" +
                    "<td>" + "<button class=view_spot_detail_info>查看詳細資料</button>" + "</td>"
                "</tr>";

                $('#SpotListTable').append(spot_str);
                _Zipcode = spotList[index].Zipcode;
            }

            $('.view_spot_detail_info').click(function (e) {
                e.preventDefault();
                let id = $(this).parent('td').parent('tr').find('.spot_id').text();
                window.location = "SearchSpotPageById?Id=" + id;
            });

            $('.add_itinerary').click(function (e) {
                if (userId === null || userId === undefined || userId === '') {
                    window.location = "/Identity/Account/Login"
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
                        url: "/AddItinerary/AddItineraryBySpot_Id",
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
            window.location = "/Identity/Account/Login"
        } else {
            $('.addplaceform').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 'slow');

            $('#numberinput').val(_Zipcode);
            $('#addressinput').val('桃園市' + _Zone);
        }
    });
    //send spot info to backend
    $('#addplaceform').submit(function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form

        var place_rule = /^\u4e00-\u9fff\d{0,20}$/;
        var number_rule = /^\u4e00-\u9fff\d{0,5}$/;
        var address_rule = /^\u4e00-\u9fff\d{0,45}$/;
        var time_rule = /^\u4e00-\u9fff\d{0,300}$/;
        var description_rule = /^\u4e00-\u9fff\d{0,1000}$/;
        if ($('#placeinput').val() == "" || $('#numberinput').val() == "" || $('#addressinput').val() == "" || $('#timearea').val() == ""|| $('#descriptionarea').val() == "")  alert("尚有未輸入資料！！");
        /*else if (!place_rule.test($('#placeinput').val())) {alert("超過文字上限！"); console.log("here");}
        else if (!number_rule.test($('#numberinput').val())) {alert("超過文字上限！"); console.log("here");}
        else if (!address_rule.test($('#addressinput').val())) {alert("超過文字上限！"); console.log("here");}
        else if (!time_rule.test($('#timearea').val())) {alert("超過文字上限！"); console.log("here");}
        else if (!description_rule.test($('#descriptionarea').val())) {alert("超過文字上限！"); console.log("here");}
        */else{
            let create_status = false;

            let Name = $('#placeinput').val();
            let Zipcode = $('#numberinput').val();
            let Address = $('#addressinput').val();
            let Opentime = $('#timearea').val();
            let Description = $('#descriptionarea').val();
            let Image = $('#image').val();
    
            let info = {
                Name: Name,
                Zipcode: Zipcode,
                Address: Address,
                Opentime: Opentime,
                Description: Description,
                UserId: userId,
                Image:Image,
                ApprovedStatus:"待審核"
            }
    
            $.ajax({
                type: "post",
                url: "/CreateSpot/CreateSpotInfo",
                data: info,
                dataType: "json",
                success: function (response) {
                    //parse json
                    var returnedData = JSON.parse(response.message);
                    create_status = returnedData.StatusMessage;
                    alert(create_status);
                },
                error: function(xhr) {
                    alert(xhr.responseText);
                }
            });
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