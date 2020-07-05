$(document).ready(function () {


})

function setSalesRegister() {

    if (isEmpty($("#salesNo").val())) {
        swal({
            title: '원단 품번을 입력해주세요.',
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

    if (isEmpty($("#salesName").val())) {
        swal({
            title: '원단 품명을 입력해주세요.',
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

    var url = ($("#salesName").val() != '') ? "/sales/ajaxModify" : "/sales/ajaxRegister";

    $.ajax({
        type: "POST",
        url: url,
        data: $("#registerForm").serialize(),
        success: function (data) {
            data = JSON.parse(data)
            window.location.href = "#/sales/list";
        },
        error: function (data) {
            alert("원단 등록에 실패했습니다.");
        }
    });

}

function getSalesList() {
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
            window.location.href = "#/sales/list";
        }
    });
}