$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "SearchSpotByDistrictSession",
        data: "",
        dataType: "json",
        success: function (response) {

            let data = JSON.parse(response.message);
            let spotList = data.Data;

            for (let index = 0; index < spotList.length; index++) {
                let spot_str = "<tr>" +
                "<td>中壢區</td>"+
                "<td>" +spotList[index].Name+"</td>" +
                "<td>" +spotList[index].Address+"</td>" +
                "<td>" +spotList[index].Description+"</td>" +
                "<td>" +"<button>新增行程</button>"+"</td>" +
                "</tr>";

                $('#SpotListTable').append(spot_str);
            }
            
        }
    });
});