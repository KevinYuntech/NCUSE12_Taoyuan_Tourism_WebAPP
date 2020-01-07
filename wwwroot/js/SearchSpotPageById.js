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
$(function(){
	$('#BackTop').click(function(){ 
		$('html,body').animate({scrollTop:0}, 333);
	});
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 150 ){
			$('#BackTop').fadeIn(222);
		} else {
			$('#BackTop').stop().fadeOut(222);
		}
	}).scroll();
});


$(document).ready(function(){
    $("div").on("scroll", function() { 
        if ($("div").scrollTop() > 0) { 
            $("#totop").fadeIn();
        }
        else {
            $("#totop").fadeOut();
        }
    });
    $("#totop").on("click", function() {
    	$("div").animate({ scrollTop: 0 }, "slow");
    });
});