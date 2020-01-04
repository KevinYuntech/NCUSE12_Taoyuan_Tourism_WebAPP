

//觸發編輯景點功能
$(document).ready(function () {
    $('.edit_btn').click(function (e) { 
        e.preventDefault();
        
        //抓取當前景點id
        let spot_id = $(this).parent('td').parent('tr').find('.Id').text();
        
        //ajax傳id 覆蓋dialog值
        let spot = SearchSpot(spot_id);
        $('#placeid').val(spot.Id);
        $('#placeinput').val(spot.Name);
        $('#numberinput').val(spot.Zipcode);
        $('#addressinput').val(spot.Address);
        $('#timearea').val(spot.Opentime);
        $('#descriptionarea').val(spot.Description);  
        $('#image').val(spot.Image);
    });

    $('.delete_btn').click(function (e) { 
        e.preventDefault();
       
        if(confirm("確定要刪除嗎?"))
        {
            //抓取當前景點id
            let spot_id = $(this).parent('td').parent('tr').find('.Id').text();
            DeleteSpot(spot_id);
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
        ApprovedStatus:"審核成功"
    }

    EditSpot(info);
});
});




function editPlaceClose() {
    console.log("close a dialog");
    document.getElementById('EditPlaceform').style.display = "none";
}
