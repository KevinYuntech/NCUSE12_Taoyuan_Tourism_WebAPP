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
            '<td align="center"><input type="datetime-local" class="start_time"  required><br>到<br><input type="datetime-local"  class="end_time" required> <button id="b" onclick="delete1(this.id);">刪除</button></td>' +
        "</tr>";

        $('#main').append(spot_str);

            console.log(returnedData.Data);
          }
        });
      }
    }
  });

  $('#downloadItnerary_btn').click(function (e) { 
    e.preventDefault();

    console.log($("tr.item"));
    $("tr.item").each(function() {
        let start_time = $(this).find("input.start_time").val();
        let end_time = $(this).find("input.end_time").val();
        console.log(start_time);
        console.log(end_time);
    }); 

    //window.location = "/SearchItinerary/DownloadItnerary";
  });
});

var min=0;



