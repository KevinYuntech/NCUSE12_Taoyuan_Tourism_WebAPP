$(document).ready(function () {
    $('#spot_id').hide();
    
   $.ajax({
       type: "GET",
       url: "/SearchSpot/SearchImageBySpotId",
       data: {SpotId:$('#spot_id').text()},
       dataType: 'json',
       async: true,
       success: function (response) {
        console.log(response.message);
        let path = response.message.replace('wwwroot','')
        $("#spot_image").attr("src",response.message);
       }
   });
    
});