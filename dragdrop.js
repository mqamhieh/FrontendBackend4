/**
 * Created by Mohamed on 11/4/2017.
 */
window.allowDrop = function (event) {
    $(".droparea").addClass("active-drop");
    event.preventDefault();
};

window.onDragLeave = function () {
    $(".droparea").removeClass("active-drop");
};

window.openFileBrowser = function () {
    $("#file_select").click();
};

var handleSelectedFile = function () {
    if (selectedFile && selectedFile.type.indexOf("image") > -1) {
        $(".droparea").removeClass("active-drop");
        $(".drop-content").hide();
        $(".on-file-dropped").show();
        $(".on-file-dropped span").text(selectedFile.name);

        var fr = new FileReader();

        fr.onload = function () {
            var fileResult = fr.result;
            $(".droparea .on-file-dropped img").attr("src", fileResult);

            var image = new Image();

            image.onload = function () {
                var canvas = document.getElementById("my-canvas");
                var context = canvas.getContext("2d");

                var width = image.width;
                var height = image.height;
                var canvasWidth = 400;
                var canvasHeight = 300;

                var ratioW, ratioH, ratio;

                ratioW = width / canvasWidth;
                ratioH = height / canvasHeight;
                ratio = (ratioW > ratioH)? ratioW: ratioH;

                var newWidth = width / ratio;
                var newHeight = height / ratio;

                canvas.width = newWidth;
                canvas.height = newHeight;
                context.drawImage(image, 0, 0, newWidth, newHeight);
                selectedFile = canvas.toDataURL("image/jpeg", 90);
                console.log(selectedFile);
            };

            image.src = fileResult;
        };

        fr.readAsDataURL(selectedFile);
    }
    else {
        selectedFile = null;
    }

};

window.onFileSelected = function (event) {
    var files = event.target.files;
    var file = files[0];

    if (files[0]) {
        selectedFile = files[0];
        handleSelectedFile();
    }
};

window.onFileDrop = function (event) {
    var files = event.dataTransfer.files;
    var file = files[0];

    if (files[0]) {
        selectedFile = files[0];
        handleSelectedFile();
    }

    event.preventDefault();
};