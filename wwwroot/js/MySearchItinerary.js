var min=0

function delete1() {
  //刪除最後一個
  document.getElementById("main").deleteRow(min);
  min--;

}



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
            let spot_str = "<tr>" +
            "<td>" + data.Name + "</td>" +
            "<td>" + data.Address + "</td>" +
            "<td>" + data.Opentime + "</td>" +
            '<td><input type="datetime-local" id="appt" name="appt" required>~<input type="datetime-local" id="appt" name="appt" required> <button id="b" onclick="delete1(this.id);">刪除</button></td>' +
        "</tr>";

        $('#main').append(spot_str);

            console.log(returnedData.Data);
          }
        });
      }
    }
  });
});

var min=0;

function takeScreenShot() {
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


function delete1(x) {
  if(min>0){
    min--;
  }
  document.getElementById("main").deleteRow(x);
}

