/**
 * Created by Mohamed on 10/14/2017.
 */

var selectedFile;

window.onFormSave = function (event) {

    $("#ajax_form .inner-form").hide();
    $("#ajax_form .saving").show();

    // We used formData in order to append the file (to be uploaded in AJAX)
    var formData = new FormData($("#ajax_form")[0]);
    formData.append("profile_picture", selectedFile);

    $.ajax({
        url: 'test.php',
        method: 'POST',
        data: formData,

        /** Special configuration when uploading a file in AJAX **/
        cache: false,
        processData: false,
        contentType: false,
        /** end of special configurations **/

        success: function (response) {
            console.log(response);
            $("#ajax_form .inner-form").show();
            $("#ajax_form .saving").hide();
        }
    });

    event.preventDefault();
    return false;
};
