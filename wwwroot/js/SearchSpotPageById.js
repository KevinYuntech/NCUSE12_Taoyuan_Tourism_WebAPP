$(document).ready(function () {
   console.log("123");

   $.ajax({
       type: "get",
       url: "../SearchSpot/SearchImageByName",
       data: {"fileName":"下載.jpg"},
       dataType: "dataType",
       success: function (response) {
            $("#spot_image").attr("src", response);
       }
   });
    
});