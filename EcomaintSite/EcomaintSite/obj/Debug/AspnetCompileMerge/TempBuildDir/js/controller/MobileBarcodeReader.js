
// upload image ,display & decode
function uploadImgDisplay(curFile) {
    // img URL
    var fileURL = window.URL.createObjectURL(curFile);
    // revoke object
    $('#fileImg').onload = function () {
        window.URL.revokeObjectURL(fileURL);
    };
    // display image
    $('#dlgFirst').css('display', 'none');
    $('#fileImg').attr('src', fileURL);
    $('#dlgReading').css('display', 'block');
    // upload image
    var fd = new FormData();
    fd.append('image', curFile);
    fd.append('barcodeFormat', 503317503);
    $.ajax({
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        url: urlReadbarcode,
        success: function (resulst) {
            if (resulst !== "error") {
                $('#cbbThietBi').val(resulst).change();
            }
            else {
                alert("không thành công");
            }
        },
        error: function (response) {
            alert("dsa");
            Alert.fn.Show("Xin vui lòng thử lại", Alert.Type.warning);
        }
    });
}
$('#fileToUpload').change(function () {
    // is file choosed 
    if (!this.files.length) {
        return;
    }
    // is image
    var file = this.files[0];
    this.value = '';
    switch (file.type) {
        case 'image/bmp':
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/png':
        case 'image/gif':
            break;
        default:
            {
                alert('The uploaded file is not supported.');
                return;
            }
    }
    uploadImgDisplay(file);
});
$('#ReadBtn').click(function () {
    $('#fileToUpload').click();
});

