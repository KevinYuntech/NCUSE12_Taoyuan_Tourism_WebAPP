$(document).ready(function () {
    $('#spot_id').hide();
    
   $.ajax({
       type: "GET",
       url: "/SearchSpot/SearchImageBySpotId",
       data: {SpotId:$('#spot_id').text()},
       dataType: 'json',
       async: false,
       success: function (response) {
        console.log(response.message);
        $("#spot_image").attr("src",response.message);
       }

      
   });
    
});