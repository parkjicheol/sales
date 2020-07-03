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

    //input X버튼
    var $ipt = $('#searchInput'),
        $clearIpt = $('#searchClear');
    $ipt.keyup(function () {
        $("#searchClear").toggle(Boolean($(this).val()));
    });

    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function () {
        $("#searchInput").val('').focus();
        $(this).hide();
    });

    //첨부파일
    var uploadFile = $('.fileBox .uploadBtn');
    uploadFile.on('change', function () {
        console.log(window.FileReader);
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
            var filesize = formatBytes($(this)[0].files[0].size, 3) + " / 10MB";
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.fileName').val(filename);
        $(this).siblings('span').text(filesize);
    });

    //summernote
    $(document).ready(function () {
        $('.summernote').summernote({
            height: 300,                 // set editor height
            minHeight: null,             // set minimum height of editor
            maxHeight: null,             // set maximum height of editor
            focus: true                  // set focus to editable area after initializing summernote
        });
    });
});

//form submit
function doSubmit() {
    swal({
        title: '저장하시겠습니까?',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'success',
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
            //set checkbox value of top notice either
            if ($('input[name=inlineCssCheckbox2]').is(":checked")) {
                $('input[name=inlineCssCheckbox2]').val('Y');
            } else {
                $('input[name=inlineCssCheckbox2]').val('N');
            }
            //execute submit
            //$('#formRegist').submit();
            var action = "/service/serviceNoticeRegist";
            var formData = new FormData($("#formRegist")[0]);

            $.ajax({
                type: "POST",
                enctype: "multipart/form-data",
                url: action,
                processData: false,
                contentType: false,
                data: formData,
                success: function (data) {
                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '공지사항 등록에 실패했습니다.',
                            text: '',
                            icon: 'error',
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

                    swal({
                        title: '공지사항이 등록 되었습니다.',
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
                            window.location.href = "#/service/serviceNoticeList";
                        }
                    });
                },
                error: function (data) {
                    swal({
                        title: '공지사항 등록에 실패했습니다.',
                        text: '',
                        icon: 'error',
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
            });
        }
    });
}
