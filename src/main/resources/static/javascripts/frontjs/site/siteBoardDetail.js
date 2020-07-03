$(document).ready(function () {

    //summernote 에디터
    $('.summernote').summernote({
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true // set focus to editable area after initializing summernote
    });

    getEventAttach();

    //첨부파일
    var uploadFile = $('.fileBox .uploadBtn');
    uploadFile.on('change', function () {
        console.log(window.FileReader);
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
            var filesize = formatBytes($(this)[0].files[0].size, 3);
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.fileName').val(filename);
        $(this).siblings('.capacity').text("(" + filesize + " / 100MB )");
        var inputFileName = $(this).siblings('.fileName');
        inputFileName.attr("onclick", "");
        inputFileName.hover(function () {
            $(this).css("text-decoration", "");
            $(this).css("cursor", "");
        });
    });

    //첨부파일 x버튼
    $('.fileName').keyup(function () {
        $(this).siblings('.inputClear').toggle(Boolean($(this).val()));
    });
    $('.inputClear').click(function () {
        var attachKey = $("#" + $(this).attr("attachKind") + "Key");
        var inputFile = $(this).siblings('input[type=file]');
        var inputFileName = $(this).siblings('.fileName');
        attachKey.siblings('.capacity').text('( 0B / 100MB )');
        attachKey.val('');
        inputFile.val('')
        inputFileName.val('')
        inputFileName.attr("onclick", "");
        inputFileName.hover(function () {
            $(this).css("text-decoration", "");
            $(this).css("cursor", "");
        });
    });
});

function getEventAttach() {
    $.ajax({
        type: "POST",
        url: "/site/board/getSiteBoardAttach",
        data: $("#formRegist").serialize(),
        success: function (data) {
            var attachInfo = JSON.parse(data.attachData);
            var attachKey = $("#articleAttachKey");
            attachKey.val(attachInfo.ATTACH_KEY);
            attachKey.siblings(".fileName").val(attachInfo.REAL_NAME);
            attachKey.siblings(".fileName").attr("onclick", "fn:doDownloadAttach('" + attachKey.val() + "')");
            attachKey.siblings(".fileName").hover(function () {
                $(this).css("text-decoration", "underline");
                $(this).css("cursor", "pointer");
            }, function () {
                $(this).css("text-decoration", "");
            });
            var filesize = "( " + formatBytes(attachInfo.FILE_SIZE, 3) + " / 100MB )";
            attachKey.siblings('.capacity').text(filesize);
        },
        error: function (data) {
            swal({
                title: '첨부파일 로드에 실패했습니다.',
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

function doDownloadAttach(attachKey) {
    $.download('/files/download', "attachKey=" + decodeURIComponent(attachKey), 'post');
}

function getPrefixList() {
    $.ajax({
        type: "POST",
        url: "/site/board/getAjaxPrefixList",
        data: {
            channelBbsSeq: $("#channelBbsSeq").val()
        },
        success: function (data) {
            var list = data.data;
            $('#channelBbsprefixSeq').empty();
            $('#channelBbsprefixSeq').append('<option value=""> 말머리선택</option>');

            if ($("#channelBbsSeq").val() != '') {
                Object.keys(list).forEach((element, index, array) => {
                    $('#channelBbsprefixSeq').append('<option value="' + list[index].CHANNEL_BBSPREFIX_SEQ + '"> ' + list[index].BBSPREFIX_TITLE + ' </option>');
                });
            }
        }
    });
}

function modifySiteBoard() {

    // summernote 이미지파일 첨부시 기본생성되는 태그 제거하여 에러방지
    $("input[name=files]").attr("disabled", true);

    // checkbox 여부에 따른 값 세팅
    if ($('input:checkbox[name=topOpenYn]').is(":checked")) {
        $('input:checkbox[name=topOpenYn]').val('Y');
    } else {
        $('input:checkbox[name=topOpenYn]').val('N');
    }

    swal({
        title: '수정하시겠습니까?',
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
                className: 'btn btn-primary',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {

        if (isConfirm) {

            var formData = new FormData($('form[name=formRegist]')[0]);

            $.ajax({
                type: "POST",
                enctype: "multipart/form-data",
                url: "/site/board/modifySiteBoard",
                processData: false,
                contentType: false,
                data: formData,
                success: function (data) {
                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '수정에 실패했습니다.',
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
                        title: '수정되었습니다.',
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
                            window.location.href = "#/site/board/siteBoardList";
                        }
                    });
                },
                error: function (data) {
                    swal({
                        title: '수정에 실패했습니다.',
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


function removeSiteBoard() {

    swal({
        title: '삭제하시겠습니까?',
        // text: 'You will not be able to recover this imaginary file!',
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

            var param = {
                channelArticleSeq: $("#channelArticleSeq").val()
            };

            $.ajax({
                type: "POST",
                contentType: 'application/json',      
                url: "/site/board/removeSiteBoard",          
                data: JSON.stringify(param),
                success: function (data) {
                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '삭제에 실패했습니다.',
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
                        title: '삭제되었습니다.',
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
                            window.location.href = "#/site/board/siteBoardList";
                        }
                    });
                },
                error: function (data) {
                    swal({
                        title: '삭제에 실패했습니다.',
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

changeCclValue = function () {
    var cclvalue1 = cclvalue2 = cclvalue3 = "0";
    var resultValue = "";
    if ($("#ccluse")[0].checked == true) {
        cclvalue1 = "1";
        $("#checkedShow")[0].style.display = "";


    } else {
        cclvalue1 = "0";
        cclvalue2 = "0";
        cclvalue3 = "0";
        $("#cclBusinessYn").val('Y');
        $("#cclContentsChangeYn").val('Y');
        $("#checkedShow")[0].style.display = "none";

        resultValue = cclvalue1 + cclvalue2 + cclvalue3;
        $("#cclCode").val(resultValue);
        return;
    }
    if ($("#cclBusinessYn").val() == 'Y') {
        cclvalue2 = "0";
    } else {
        cclvalue2 = "1";
    }
    if ($("#cclContentsChangeYn").val() == 'Y') {
        cclvalue3 = "0";
    } else {
        cclvalue3 = "1";
    }
    resultValue = cclvalue1 + cclvalue2 + cclvalue3;
    $("#cclCode").val(resultValue);
}