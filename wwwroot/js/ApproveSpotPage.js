$(document).ready(function () {

    $('#approve_btn').click(function (e) {
        e.preventDefault();

        //抓取當前景點id
        let spot_id = $(this).parent('td').parent('tr').find('.Id').text();

        //ajax傳id 覆蓋dialog值
        $.ajax({
            type: "get",
            url: "/SearchSpot/SearchSpotById",
            data: {
                "id": spot_id
            },
            dataType: "json",
            async: false,
            success: function (response) {
                let data = JSON.parse(response.message);
                let spot = data.Data;
                $('#placeid').val(spot.Id);
                $('#placeinput').val(spot.Name);
                $('#numberinput').val(spot.Zipcode);
                $('#addressinput').val(spot.Address);
                $('#timearea').val(spot.Opentime);
                $('#descriptionarea').val(spot.Description);
                $('#image').val(spot.Image);
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        });

    });
    $('#approve_valid_btn').click(function (e) {
        e.preventDefault();

        let Id = $('#placeid').val();
        let Name = $('#placeinput').val();
        let Zipcode = $('#numberinput').val();
        let Address = $('#addressinput').val();
        let Opentime = $('#timearea').val();
        let Description = $('#descriptionarea').val();
        let Image = $('#image').val();;
    
        let info = {
            Id:Id,
            Name: Name,
            Zipcode: Zipcode,
            Address: Address,
            Opentime: Opentime,
            Description: Description,
            UserId: userId,
            Image:Image,
            ApprovedStatus:"審核成功"
        }

        $.ajax({
            type: "put",
            url: "/EditSpot/EditSpot",
            data: info,
            dataType: "json",
            success: function(response) {
                let returnedData = JSON.parse(response.message);
                let status = returnedData.Status;
                ;
                if (status === true) {
                    alert("審核資料成功");
                    window.location.reload();
                } else {
                    alert("審核資料失敗")
                    alert(returnedData.StatusMessage);
                }
            },
            error: function(xhr) {
                alert(xhr.responseText);
            }
        });
    });

    $('#approve_invalid_btn').click(function (e) {
        e.preventDefault();

        let Id = $('#placeid').val();
        let Name = $('#placeinput').val();
        let Zipcode = $('#numberinput').val();
        let Address = $('#addressinput').val();
        let Opentime = $('#timearea').val();
        let Description = $('#descriptionarea').val();
        let Image = $('#image').val();;
    
        let info = {
            Id:Id,
            Name: Name,
            Zipcode: Zipcode,
            Address: Address,
            Opentime: Opentime,
            Description: Description,
            UserId: userId,
            Image:Image,
            ApprovedStatus:"審核失敗"
        }

        $.ajax({
            type: "put",
            url: "/EditSpot/EditSpot",
            data: info,
            dataType: "json",
            success: function(response) {
                let returnedData = JSON.parse(response.message);
                let status = returnedData.Status;
                ;
                if (status === true) {
                    alert("審核資料成功");
                    window.location.reload();
                } else {
                    alert("審核資料失敗")
                    alert(returnedData.StatusMessage);
                }
            },
            error: function(xhr) {
                alert(xhr.responseText);
            }
        });
    });
});