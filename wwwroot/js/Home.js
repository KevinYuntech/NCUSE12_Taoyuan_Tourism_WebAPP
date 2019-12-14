$(document).ready(function () {

  //addSpot 模擬api
  $("#addSpot").click(function () {
    alert("新增景點");
    $.ajax({
      url: "CreatePublicSpot/CreateSpotInfo", //請求的url地址
      dataType: "json", //返回格式為json
      async: true, //請求是否非同步，預設為非同步，這也是ajax重要特性
      data: {
        "Name": "Joe",
        "Address": "",
      }, //引數值
      type: "POST", //請求方式
      beforeSend: function () {
        //請求前的處理
      },
      success: function (req) {
        alert(req.message);
      },
      complete: function () {
        //請求完成的處理
      },
      error: function () {
        //請求出錯處理
      }
    });
  });

});