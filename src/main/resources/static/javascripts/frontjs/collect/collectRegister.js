$(document).ready(function () {


})

function setCollectRegister() {

    if (isEmpty($("#collectDate").val())) {
        swal({
            title: '수금일자를 입력해주세요',
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

    if (isEmpty($("#collectType").val())) {
        swal({
            title: '수금지급방법을 입력하세요.',
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

    if (isEmpty($("#price").val())) {
        swal({
            title: '금액을 입력하세요.',
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

    var url = ($("#seq").val() != undefined) ? "/collect/ajaxModify" : "/collect/ajaxRegister";

    $.ajax({
        type: "POST",
        url: url,
        data: $("#registerForm").serialize(),
        success: function (data) {
            data = JSON.parse(data)
            window.location.href = "#/collect/list";
        },
        error: function (data) {
            alert("수금액 등록에 실패했습니다.");
        }
    });

}

function getCollectList() {
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
            window.location.href = "#/collect/list";
        }
    });
}