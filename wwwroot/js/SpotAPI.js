function CreateSpot(info) {
    $(document).ready(function () {
        $.ajax({
            type: "post",
            url: "/CreateSpot/CreateSpotInfo",
            data: info,
            dataType: "json",
            success: function (response) {
                //parse json
                var returnedData = JSON.parse(response.message);
                create_status = returnedData.StatusMessage;
                alert(create_status);
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
                alert('刪除成功');
                window.location.reload();
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