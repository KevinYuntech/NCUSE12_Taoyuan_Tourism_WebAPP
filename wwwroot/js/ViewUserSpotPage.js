

//觸發編輯景點功能
$(document).ready(function () {
    $('.edit_btn').click(function (e) { 
        e.preventDefault();
        
        //抓取當前景點id
        let spot_id = $(this).parent('td').parent('tr').find('.Id').text();
        
        //ajax傳id 覆蓋dialog值
        $.ajax({
            type: "get",
            url: "../SearchSpot/SearchSpotById",
            data: {"id":spot_id},
            dataType: "json",
            async: false,
            success: function(response) {
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
            error: function(xhr) {
                alert(xhr.responseText);
            }
        });
    });

    $('.delete_btn').click(function (e) { 
        e.preventDefault();
       
        if(confirm("確定要刪除嗎?"))
        {
            //抓取當前景點id
            let spot_id = $(this).parent('td').parent('tr').find('.Id').text();

            //ajax傳id 覆蓋dialog值
            $.ajax({
                type: "delete",
                url: "../DeleteSpot/DeleteSpotById",
                data: {"id":spot_id},
                dataType: "json",
                async: false,
                success: function(response) {
                    alert('刪除成功');
                    window.location.reload();  
                },
                error: function(xhr) {
                    alert(xhr.responseText);
                }
            });
        }
        else
        {
            alert("刪除取消");      
        }    
        
    });

    //確認送出
$('#submit_btn').click(function(e) {
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
        ApprovedStatus:"待審核"
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
                alert("修改資料成功");
                window.location.reload();
            } else {
                alert("修改資料失敗")
                alert(returnedData.StatusMessage);
            }
        },
        error: function(xhr) {
            alert(xhr.responseText);
        }
    });

});
});




function editPlaceClose() {
    console.log("close a dialog");
    document.getElementById('EditPlaceform').style.display = "none";
}
