let error=false;
$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "/SearchItinerary/GetCurrentItineraryList",
    data: "",
    dataType: "json",
    success: function (response) {
      console.log(response.message.length);
      
      for(let i = 0; i<= response.message.length;i++)
      {
        $.ajax({
          type: "GET",
          url: "/SearchSpot/SearchSpotById",
          data: {"id":response.message[i]},
          dataType: "JSON",
          success: function (response) {
            var returnedData = JSON.parse(response.message);
            let data = returnedData.Data;
            let spot_str = "<tr class='item'>" +
            "<td align='center'>" + data.Name + "</td>" +
            "<td>" + data.Address + "</td>" +
            "<td>" + data.Opentime + "</td>" +
            '<td align="center"><input align="center" type="datetime-local" class="start_time"  id="start" required="required"><span style="display:none" id="p1">~</span><br>到</br><input align="center"type="datetime-local"  class="end_time" id="end" required="required"><span style="display:none" id="p2">~</span></td>' +
        "</tr>";

        $('#main').append(spot_str);

            console.log(returnedData.Data);
          }
        });
      }
    }
  });
});

function takeScreenShot() {
    $("tr.item").each(function() {
        
        let start_time = $(this).find("input.start_time").val();
        let end_time = $(this).find("input.end_time").val();

        if(start_time=="undefined" || end_time=="undefined" ||start_time=="" || end_time==""||start_time==null || end_time==null){
            error=true;
            alert("日期不得為空!!");
        }
        document.getElementById("p1").innerHTML= start_time;
        document.getElementById("p2").innerHTML= end_time;
        
        document.getElementById("start").style.display = "none";
        document.getElementById("end").style.display = "none";
        document.getElementById('start').id = 'down1';
        document.getElementById('end').id = 'down2';
        
        $("#p1").show();
        $("#p2").show();
        document.getElementById('p1').id = 'down3';
        document.getElementById('p2').id = 'down4' ;
    }); 

    if(error==true){
        history.go(0);
        return false;
    }
    var width22 = document.getElementById("needdownload").clientWidth;
    var height22 = document.getElementById("needdownload").clientHeight;

    html2canvas(document.getElementById("needdownload"), {
        onrendered: function (canvas) {
            var tempcanvas=document.createElement('canvas');
            tempcanvas.width=width22;
            tempcanvas.height=height22;
            var context=tempcanvas.getContext('2d');
            context.drawImage(canvas,0,0,tempcanvas.width,tempcanvas.height);
            var link=document.createElement("a");

            link.href=tempcanvas.toDataURL('image/jpg');   //function blocks CORS
            link.download = 'screenshot.jpg';
            link.click();
        }
    });
}