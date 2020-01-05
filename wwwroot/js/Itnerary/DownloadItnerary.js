function takeScreenShot() {
    var width22 = document.getElementById("needdownload").clientWidth;
    var height22 = document.getElementById("needdownload").clientHeight;

    html2canvas(document.getElementById("needdownload"), {
        onrendered: function (canvas) {
            var tempcanvas=document.createElement('canvas');
            tempcanvas.width=width22;
            tempcanvas.height=height22;
            var context=tempcanvas.getContext('2d');
            context.drawImage(canvas,0,0,tempcanvas.width,tempcanvas.height);
            var link=document.createElement("a");

            link.href=tempcanvas.toDataURL('image/jpg');   //function blocks CORS
            link.download = 'screenshot.jpg';
            link.click();
        }
    });
}