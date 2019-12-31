//新增景點
$('#addplace').click(function(e) {


    if (userId === null || userId === undefined || userId === '') {
        alert('請先登入');
    } else {
        console.log("pop a dialog");
        document.getElementById('addplaceform').style.display = "";
    }
});

//確認送出
$('#submit_info').click(function(e) {
    let info = {
        name: $('#placeinput').val(),
        time: $('#timeinput').val(),
        description: $('#descriptionarea').val(),

    }
    console.log(info);
    //思筠
    if (name.length && description.length && address.length) {
        //利用ajax將使用者的資訊post到後端(api)
        //將後端的回傳的response給顯示在response_text中

        $.ajax({
            type: "post",
            url: "",
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
    

$(document).ready(function () {
    $('.edit_btn').click(function (e) { 
        e.preventDefault();
        document.getElementById("EditPlaceform").style.display = "block";
    });
});

function editSpot() {

    document.getElementById("EditPlaceform").style.display = "block";
}

function editPlaceClose() {
    console.log("close a dialog");
    document.getElementById('EditPlaceform').style.display = "none";
}

function loadLoginUser() {
    $(document).ready(function() {
        $.ajax({
            type: "get",
            url: "Account/GetLoginUser",
            data: "",
            dataType: "json",
            async: false,
            success: function(response) {
                userId = response.userId;
                console.log(userId);
            }
        });

    });
}