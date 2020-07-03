$(document).ready(function () {

    // 기존 파일크기 입력
    setInitFileSize({
        eventLinkBtnSize: $("#eventLinkBtnSize"),
        studyEventAttachSize: $("#studyEventAttachSize"),
        eventListAttachSize: $("#eventListAttachSize"),
        mainListEventAttachSize: $("#mainListEventAttachSize"),
        eventFileAttachSize: $("#eventFileAttachSize")
    });

    //캘린더
    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: $("#eventStartDate").attr("prevValue") || moment(),
        endDate: $("#eventFinishDate").attr("prevValue") || moment().add('months', 1),
        minDate: '2012/01/01',
        maxDate: '2029/12/31',
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
    }, function (start, end) {
        $('#default-daterange input').val(start.format('YYYY.MM.DD') + ' - ' + end.format('YYYY.MM.DD'));

        var startDate = start.format('YYYYMMDD') + '000000';
        var finishDate = end.format('YYYYMMDD') + '235959';

        $("#eventStartDate").val(startDate);
        $("#eventFinishDate").val(finishDate);

    });

    //summernote 에디터
    $('.summernote').summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote
    });

    //이벤트링크 사용여부 Y 선택시 url input보이게
    $('.eventlink select').on('change', function () {
        if ($(this).val() === 'Y') {
            $('.eventlinkUrl').show();
        } else if ($(this).val() === 'N') {
            $('.eventlinkUrl').hide();
        }
    });

    //input X버튼
    var $ipt = $('#eventName'),
        $clearIpt = $('#searchClear');
    $ipt.keyup(function () {
        $('#searchClear').toggle(Boolean($(this).val()));
    });
    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function () {
        $('#eventName').val('').focus();
        $(this).hide();
    });

    //첨부파일
    var uploadFile = $('.fileBox .uploadBtn');
    uploadFile.on('change', function () {
        console.log(window.FileReader);
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        var filesize = formatBytes($(this)[0].files[0].size, 3);
        $(this).siblings('.fileName').val(filename);
        $(this).siblings('.fileName').removeClass("fileDownload");
        $(this).siblings('.fileName').attr("onclick", "");
        $(this).siblings('.capacity').text("( " + filesize + " / 100MB )");
    });

    //첨부파일 x버튼
    $('.fileName').keyup(function () {
        $(this).siblings('.inputClear').toggle(Boolean($(this).val()));
    });
    $('.inputClear').click(function () {
        $(this).siblings('.fileInfo').val('');
        $(this).siblings('.capacity').text('( 0B / 100MB )');
        $(this).siblings('.fileName').removeClass("fileDownload");
        $(this).siblings('.fileName').attr("onclick", "");
    });

});

function doDownloadAttach(attachKey) {
    $.download('/files/download', "attachKey=" + decodeURIComponent(attachKey), 'post');
}

function getServiceEventList() {
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
            window.location.href = "#/service/serviceEventList";
        }
    });
}


function setServiceEvent() {

    if (isEmpty($("#eventName").val()) && isEmpty($("#eventName").attr("placeholder"))) {

        swal({
            title: '이벤트명을 입력해주세요.',
            text: '',
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

    if (isEmpty($('#default-daterange input').val())) {

        swal({
            title: '날짜를 선택해주세요.',
            text: '',
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

    // summernote 이미지파일 첨부시 기본생성되는 태그 제거하여 에러방지
    $("input[name=files]").attr("disabled", true);

    $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: "/service/setServiceEvent",
        processData: false,
        contentType: false,
        data: new FormData($("#formRegist")[0]),
        success: function (data) {
            if (Number(data.successCount) < 1) {
                swal({
                    title: '이벤트 저장에 실패했습니다.',
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
                    window.location.href = "#/service/serviceEventList";
                }
            });
        },
        error: function (data) {
            swal({
                title: '이벤트 저장에 실패했습니다.',
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


function removeServiceEvent() {
    swal({
        title: '삭제 하시겠습니까?',
        icon: 'error',
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
                className: 'btn btn-danger',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {
        if (isConfirm) {

            var eventSeqs = [];
            eventSeqs.push($("#eventSeq").val());

            $.ajax({
                type: "POST",
                url: "/service/removeServiceEvent",
                data: "eventSeqs=" + eventSeqs,
                success: function (data) {
                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '이벤트 삭제에 실패했습니다.',
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
                    swal({
                        title: '이벤트를 삭제했습니다.',
                        text: '',
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
                            window.location.href = "#/service/serviceEventList";
                        }
                    });
                },
                error: function (data) {
                    swal({
                        title: '이벤트 삭제에 실패했습니다.',
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
    });
}

function setInitFileSize(params) {

    Object.keys(params).forEach((element, index, array) => {

        if (!isEmpty(params[element].attr("prevValue"))) {
            params[element].text("( " + formatBytes(params[element].attr("prevValue")) + " / 100MB )");
        }
    })

}