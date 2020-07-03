$(document).ready(function () {
    // 설문내용 최대 글자 속성
    $("#pollContents").attr("maxlength", 4000);

    // 시작/종료일자 달력
    $('#default-daterange').daterangepicker({
            opens: 'right',
            format: 'YYYY/MM/DD',
            separator: ' to ',
            startDate: $("#pollStartDate").attr("prevValue") || moment(),
            endDate: $("#pollFinishDate").attr("prevValue") || moment().add('months', 1),
            minDate: '01/01/2012',
            maxDate: '12/31/2029',
            showDropdowns: true,
            locale: {
                format: 'YYYY.MM.DD',
                "monthNames": [
                    "1월",
                    "2월",
                    "3월",
                    "4월",
                    "5월",
                    "6월",
                    "7월",
                    "8월",
                    "9월",
                    "10월",
                    "11월",
                    "12월"
                ]
            }
        },
        function (start, end) {
            $('#default-daterange input').val(start.format('YYYY.MM.DD') + ' - ' + end.format('YYYY.MM.DD'));
            var pollStartDate = start.format('YYYYMMDDHH') + '0000';
            var pollFinishDate = end.format('YYYYMMDDHH') + '5959';

            $("#pollStartDate").val(pollStartDate);
            $("#pollFinishDate").val(pollFinishDate);
        }
    );

    //input X버튼
    var $ipt = $('#pollTitle'),
        $clearIpt = $('#searchClear');
    $ipt.keyup(function () {
        $("#searchClear").toggle(Boolean($(this).val()));
    });

    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function () {
        $("#pollTitle").val('').focus();
        $(this).hide();
    });

})

function setServiceSurvey() {

    if (isEmpty($("#pollTitle").val())) {
        swal({
            title: '제목을 입력해주세요.',
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

    if (isEmpty($("#pollStartDate").val()) || isEmpty($("#pollFinishDate").val())) {
        swal({
            title: '날짜를 선택해주세요.',
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

    $.ajax({
        type: "POST",
        url: "/service/setServiceSurvey",
        data: $("#registerForm").serialize(),
        success: function (data) {
            window.location.href = "#/service/serviceSurveyRegister?pollSeq=" + data.pollSeq;
        },
        error: function (data) {
            alert("설문 등록에 실패했습니다.");
        }
    });

}


function modifyServiceSurvey() {

    if (isEmpty($("#pollTitle").val())) {
        swal({
            title: '제목을 입력해주세요.',
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

    $.ajax({
        type: "POST",
        url: "/service/modifyServiceSurvey",
        data: $("#registerForm").serialize(),
        success: function (data) {

            if (Number(data.successCount) < 1) {
                swal({
                    title: '설문 등록에 실패했습니다.',
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
            }).then(function (isConfirm) {
                if (isConfirm) {
                    window.location.href = "#/service/serviceSurveyList";
                }
            });
        },

        error: function (data) {
            swal({
                title: '설문 등록에 실패했습니다.',
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
            return false;
        }
    });

}


function getServiceSurveyList() {
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
            window.location.href = "#/service/serviceSurveyList";
        }
    });
}