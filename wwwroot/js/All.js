//load current user status
let userId;
loadLoginUser();
console.log(userId);

function loadLoginUser() {
    $(document).ready(function () {
        $.ajax({
            type: "get",
            url: "/Account/GetLoginUser",
            data: "",
            dataType: "json",
            async: false,
            success: function (response) {
                userId = response.userId;
                console.log(userId);
            }
        });

    });
}

$('#view_Itneary_btn').click(function (e) { 
    e.preventDefault();
    if (userId === null || userId === undefined || userId === '') {
        window.location = "/Identity/Account/Login"
    }
    else{
        window.location = "/SearchItinerary/MySearchItinerary";
    }
});
