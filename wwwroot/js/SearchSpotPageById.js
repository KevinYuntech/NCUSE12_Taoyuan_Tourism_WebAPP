$(document).ready(function () {
    $('#spot_id').hide();
    
   $.ajax({
       type: "GET",
       url: "/SearchSpot/SearchImageBySpotId",
       data: {SpotId:$('#spot_id').text()},
       dataType: 'json',
       async: false,
       success: function (response) {
        $("#spot_image").attr("src",response.message);
       }
   });

   $('#add_itinerary_btn').click(function (e) {
    if (userId === null || userId === undefined || userId === '') {
        window.location = "/Identity/Account/Login"
    }
    else{
        let Spot_Id = $('#spot_id').text();
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

});