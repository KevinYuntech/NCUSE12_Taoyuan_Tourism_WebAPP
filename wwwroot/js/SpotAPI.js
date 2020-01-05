function CreateSpot(info) {
    $(document).ready(function () {
        $.ajax({
            type: "post",
            url: "/CreateSpot/CreateSpotInfo",
            data: info,
            dataType: "json",
            success: function (response) {
                let returnedData = JSON.parse(response.message);
                let status = returnedData.Status;;
                if (status === true) {
                    alert("新增資料成功");
                    window.location.reload();
                } else {
                    alert("新增資料失敗")
                    alert(returnedData.StatusMessage);
                }
                
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    });

}

function EditSpot(info) {

    $(document).ready(function () {
        $.ajax({
            type: "put",
            url: "/EditSpot/EditSpot",
            data: info,
            dataType: "json",
            success: function (response) {
                let returnedData = JSON.parse(response.message);
                let status = returnedData.Status;;
                if (status === true) {
                    alert("修改資料成功");
                    window.location.reload();
                } else {
                    alert("修改資料失敗")
                    alert(returnedData.StatusMessage);
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    });

}

function DeleteSpot(spot_id) {
    $(document).ready(function () {
        $.ajax({
            type: "delete",
            url: "/DeleteSpot/DeleteSpotById",
            data: {
                "id": spot_id
            },
            dataType: "json",
            async: false,
            success: function (response) {
                let returnedData = JSON.parse(response.message);
                let status = returnedData.Status;;
                if (status === true) {
                    alert("刪除資料成功");
                    window.location.reload();
                } else {
                    alert("刪除資料失敗")
                    alert(returnedData.StatusMessage);
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });
    });
}

function SearchSpot(spot_id) {
    let _spot;

    $.ajax({
        type: "get",
        url: "/SearchSpot/SearchSpotById",
        data: {"id":spot_id},
        dataType: "json",
        async: false,
        cache:false,
        success: function(response) {
            let data = JSON.parse(response.message);
            _spot = data.Data;
            
           
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });    
    return _spot;
}

function ValidInputField(info) {
    let status = true;

    let Name = info.Name;
    let Zipcode = info.Zipcode;
    let Address = info.Address;
    let Opentime = info.Opentime;
    let Description = info.Description;
    let Image = info.Image;

    if (Name == "" || Zipcode == "" || Address == "" || Opentime == ""|| Description == "" || Image =="")
    {
      alert("尚有未輸入資料！！");
      status = false;
    }
    else if (!checkLength(Name.length,20)) {
      alert("景點名稱超過文字上限！");
      status = false;
    }
    else if (!checkLength(Zipcode.length,3)) {
      alert("郵遞區號超過文字上限！");
      status = false;
    }
    else if (!checkLength(Address.length,45)) {
      alert("地址超過文字上限！");
      status = false;
    }
    else if (!checkLength(Opentime.length,265)) {
      alert("營業時間超過文字上限！");
      status = false;
    }
    else if (!checkLength(Description.length,1165)) {
      alert("景點介紹超過文字上限！");
      status = false;
    }
    else{
        status = true;
    }

    return status;
}

function checkLength(user_input_length, max_length){
    if(user_input_length <= max_length)
    {
      return true;
    }
    else {
      return false;
    }
  }