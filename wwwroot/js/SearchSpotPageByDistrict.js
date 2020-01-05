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
            $('#front_addressinput').val('桃園市' + _Zone);
        }
    });
    //send spot info to backend
    $('#submit_btn').click(function (e) {
        Address = $('#front_addressinput').val()+ $('#addressinput').val();
        console.log(Address);

        let info = {
            Name: $('#placeinput').val(),
            Zipcode: $('#numberinput').val(),
            Address: Address,
            Opentime: $('#timearea').val(),
            Description:  $('#descriptionarea').val(),
            UserId: userId,
            Image:$('#image').val(),
            ApprovedStatus:"待審核"
        }
        if(ValidInputField(info)){
            CreateSpot(info);
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

