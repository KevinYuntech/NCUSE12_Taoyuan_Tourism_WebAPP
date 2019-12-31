var min=0
function newadd() {
  
  var tab=document.getElementById('main');
  var row=tab.insertRow(min+1)
  row.innerHTML+='<td><form><select name="YourLocation"><option value="Taipei">台北</option><option value="Taoyuan">桃園</option><option value="Hsinchu">新竹</option><option value="Miaoli">苗栗</option></select></form></td><td>新增02</td><td>新增03</td><td><input type="time" id="appt" name="appt" required>~<input type="time" id="appt" name="appt" required></td>';
  min++;

}
function delete1() {
  //刪除最後一個
  document.getElementById("main").deleteRow(min);
  min--;

}
function check() {
  if (window.confirm('是否要排序時間並儲存行程?')) {
    document.frm.submit();
  } else {
    return false;
  }
}


$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "../SearchItinerary/GetCurrentItineraryList",
    data: "",
    dataType: "json",
    success: function (response) {
      


      $('#itinerary_count').text(response.message.length);
    }
  });
});

