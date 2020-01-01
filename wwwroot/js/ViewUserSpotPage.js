

//觸發編輯景點功能
$(document).ready(function () {
    $('.edit_btn').click(function (e) { 
        e.preventDefault();
        document.getElementById("EditPlaceform").style.display = "block";

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
                $('#time').val(spot.Opentime);
                $('#descriptionarea').val(spot.Description);
                
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
                    alert(response.message.StatusMessage);  
                }
            });
        }
        else
        {
            alert("已經取消了刪除操作");      
        }    
        
    });

    //確認送出
$('#submit_info').click(function(e) {
    e.preventDefault();
    alert('送出');
    //須提供Address Zipcode Opentime
    let info = {
        id:$('#placeid').val(),
        name: $('#placeinput').val(),
        description: $('#descriptionarea').val(),
        Address: $('#placeinput').val(),
        Zipcode:123,
        Opentime: $('#placeinput').val(),
        UserId:userId
    }
    //思筠
    if (true) {
        //利用ajax將使用者的資訊post到後端(api)
        //將後端的回傳的response給顯示在response_text中

        $.ajax({
            type: "put",
            url: "../EditSpot/EditSpot",
            data: info,
            dataType: "json",
            success: function(response) {
                alert(response.message);
            },
            error: function(xhr) {
                alert(xhr.responseText);
            }
        });
    } else {
        alert("尚有未輸入資料!!");
    }

    //思筠

});
});



function editSpot() {

    document.getElementById("EditPlaceform").style.display = "block";
}

function editPlaceClose() {
    console.log("close a dialog");
    document.getElementById('EditPlaceform').style.display = "none";
}
