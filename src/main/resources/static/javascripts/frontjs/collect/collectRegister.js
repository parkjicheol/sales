$(document).ready(function () {

    $('#datepicker-collect').datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'yyyy-mm-dd',
        language: 'kor'
    });

    $("#price").on("keypress", null, function() {
        if((event.keyCode < 48) || (event.keyCode > 57))
            event.returnValue=false;
    });

    $("#price").on("keyup", null, function () {
        var $input = $(this);
        $input.val($input.val().replace(/[^0-9]/g,""));
        var value = $input.val().replace(/,/gi, '');
        var num = value.replace(/(.)(?=(.{3})+$)/g,"$1,");
        $input.val(num);
    });

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

    var url = ($("#seq").val() == undefined || $("#seq").val() == '') ? "/servlet/collect/ajaxRegister" : "/servlet/collect/ajaxModify";

    var targetForm = $("#registerForm :input");
    $.each(targetForm, function (index, elem) {
        $(this).val($(this).val().replace(/,/g, ''));
    });

    $.ajax({
        type: "POST",
        url: url,
        data: $("#registerForm").serialize(),
        success: function (data) {
            data = JSON.parse(data)
            window.location.href = "#/servlet/collect/list";
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
            window.location.href = "#/servlet/collect/list";
        }
    });
}