$(document).ready(function () {

    $('.approve_btn').click(function (e) {
        e.preventDefault();

        //抓取當前景點id
        let spot_id = $(this).parent('td').parent('tr').find('.Id').text();

        console.log(spot_id);

        //ajax傳id 覆蓋dialog值
        let spot = SearchSpot(spot_id);

        $('#userid').val(spot.UserId);
        $('#placeid').val(spot.Id);
        $('#placeinput').val(spot.Name);
        $('#numberinput').val(spot.Zipcode);
        $('#addressinput').val(spot.Address);
        $('#timearea').val(spot.Opentime);
        $('#descriptionarea').val(spot.Description);
        $('#image').val(spot.Image);

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
        let UserId = $('#userid').val();

        let info = {
            Id:Id,
            Name: Name,
            Zipcode: Zipcode,
            Address: Address,
            Opentime: Opentime,
            Description: Description,
            UserId: UserId,
            Image:Image,
            ApprovedStatus:"審核成功"
        }

        EditSpot(info);
    });

    $('#approve_invalid_btn').click(function (e) {
        e.preventDefault();

        let Id = $('#placeid').val();
        let Name = $('#placeinput').val();
        let Zipcode = $('#numberinput').val();
        let Address = $('#addressinput').val();
        let Opentime = $('#timearea').val();
        let Description = $('#descriptionarea').val();
        let Image = $('#image').val();
    
        let info = {
            Id:Id,
            Name: Name,
            Zipcode: Zipcode,
            Address: Address,
            Opentime: Opentime,
            Description: Description,
            UserId: $('#userid').val(),
            Image:Image,
            ApprovedStatus:"審核失敗"
        }

        EditSpot(info);
    });
});