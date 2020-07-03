$(document).ready(function () {
    App.setPageTitle('Color Admin | General UI Elements');
    App.restartGlobalFunction();

    $.when($.getScript('../javascripts/plugins/highlight.js/highlight.min.js'), $.Deferred(function (deferred) {
        $(deferred.resolve);
    })).done(function () {
        $.getScript('../javascripts/plugins/js/render.highlight.js'), $.Deferred(function (deferred) {
            $(deferred.resolve);
        })
    });

    //summernote 에디터
    $('.summernote').summernote({
        height: 300,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true                  // set focus to editable area after initializing summernote
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

    if(!isEmpty($('#fileSize').val())){
        $('.capacity').text('( ' + formatBytes(Number($('#fileSize').val())) + ' / 100MB )');
    }

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

function deleteChannelDetail() {
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
            var channelSeqList = [];
            channelSeqList.push($('#articleSeq').val());

            //set checkbox value of top notice either
            var param = { articleSeqs: channelSeqList.join(), attachKey: $('#attachKey').val() };
            $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: "/service/ajaxRemoveNoticeList",
                data: JSON.stringify(param),
                success: function () {
                    window.location.href = "#/service/serviceNoticeList";
                },
                error: function () {
                    swal({
                        title: '공지사항 삭제에 실패했습니다.',
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
    })
};

function doSave() {
    swal({
        title: '저장 하시겠습니까?',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        buttons: {
            cancel: {
                text: '취소',
                value: null,
                visible: true,
                className: 'btn btn-default',
                closeModal: true,
            },
            confirm: {
                text: '저장',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {
        if (isConfirm) {
            //set checkbox value of top notice either
            if ($('input[name=inlineCssCheckbox2]').is(":checked")) {
                $('input[name=inlineCssCheckbox2]').val('Y');
            } else {
                $('input[name=inlineCssCheckbox2]').val('N');
            }
            var formData = new FormData($("#formRegist")[0]);

            $.ajax({

                type: "POST",
                enctype: "multipart/form-data",
                url: "/service/ajaxServiceNoticeUpdate",
                processData: false,
                contentType: false,
                data: formData,
                success: function () {
                    window.location.href = '#/service/serviceNoticeList';
                },
                error: function () {
                    swal({
                        title: '공지수항 수정에 실패했습니다.',
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
    })
}

function doDownloadAttach(attachKey) {
    $.download('/files/download', "attachKey=" + decodeURIComponent(attachKey), 'post');
}
