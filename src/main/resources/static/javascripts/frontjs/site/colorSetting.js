$(document).ready(function () {

    $('#colorpicker').colorpicker({
        format: 'hex'
    });
    $('#colorpicker').colorpicker('setValue', $("#color").val());
    
    $("#colorpicker").on("propertychange change keyup paste input", function () {

        $(this).css('background-color', $(this).val());
        $("#color").val($(this).val());

    });

    $("#color").on("propertychange change keyup paste input", function () {

        if (!(event.keyCode >=37 && event.keyCode<=40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9#]/gi,''));
        }

        if ($(this).val().length <= 1) {
            $(this).val("#");
        }

        if ($(this).val().length === 7) {
            $("#colorpicker").css('background-color', $(this).val());
            $('#colorpicker').colorpicker('setValue', $(this).val());
        }

    });

    $('#logoSaveSubmit').click(function (e) {
        e.preventDefault();

        setColorSetting();
    });

});

function setColorSetting() {

    $.ajax({
        type: "POST",
        url: "/site/design/setColorSetting",
        data: $("#formRegist").serialize(),
        success: function (data) {
            if (Number(data.successCount) < 1) {
                swal({
                    title: '메뉴 색상 저장에 실패했습니다.',
                    text: '',
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: '확인',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            }
            swal({
                title: '저장되었습니다.',
                icon: 'success',
                buttons: {
                    confirm: {
                        text: '확인',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            })
        },
        error: function (data) {
            swal({
                title: '메뉴 색상 저장에 실패했습니다.',
                text: '',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: '확인',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    });
}