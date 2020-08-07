$(document).ready(function () {

    //첨부파일
    var uploadFile = $('.fileBox .uploadBtn');
    uploadFile.on('change', function () {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
            var filesize = $(this)[0].files[0].size;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        setFileInfo(filename, filesize, this);

    });

})

function setFabricRegister() {

    if (isEmpty($("#companyNo").val())) {
        swal({
            title: '사업자번호를 입력해주세요.',
            icon: 'info',
            buttons: {
                confirm: {
                    text: '확인',
                    value: true,
                    visible: true,
                    className: 'btn btn-info',
                    closeModal: true
                }
            }
        });
        return false;
    }

    if (isEmpty($("#companyName").val())) {
        swal({
            title: '업체명을 입력해주세요.',
            icon: 'info',
            buttons: {
                confirm: {
                    text: '확인',
                    value: true,
                    visible: true,
                    className: 'btn btn-info',
                    closeModal: true
                }
            }
        });
        return false;
    }

    var url = ($("#seq").val() == undefined || $("#seq").val() == '') ? "/servlet/company/ajaxRegister" : "/servlet/company/ajaxModify";
    console.log(url);
    $.ajax({
        type: "POST",
        url: url,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        data: new FormData($("#registerForm")[0]), //$("#registerForm").serialize(),
        success: function (data) {
            data = JSON.parse(data)
            window.location.href = "#/servlet/company/list";
        },
        error: function (data) {
            alert("업체 등록에 실패했습니다.");
        }
    });

}

function getFabricList() {
    swal({
        title: '목록으로 이동하시겠습니까?',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'info',
        buttons: {
            cancel: {
                text: '취소',
                value: null,
                visible: true,
                className: 'btn btn-default',
                closeModal: true,
            },
            confirm: {
                text: '확인',
                value: true,
                visible: true,
                className: 'btn btn-info',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {
        if (isConfirm) {
            window.location.href = "#/servlet/company/list";
        }
    });
}

function setFileInfo(filename, filesize, fileObj) {
    $(fileObj).siblings('.fileName').val(filename);
    $(fileObj).siblings('span.capacity').text("(" + formatBytes(filesize, 3) + " / 10MB)");
}