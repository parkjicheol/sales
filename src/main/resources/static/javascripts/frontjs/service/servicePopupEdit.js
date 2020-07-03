$(document).ready(function () {
    /*
    App.setPageTitle('Color Admin | General UI Elements');
    App.restartGlobalFunction();
    */
    $.when($.getScript('../javascripts/plugins/highlight.js/highlight.min.js'), $.Deferred(function (deferred) {
        $(deferred.resolve);
    })).done(function () {
        $.getScript('../javascripts/plugins/js/render.highlight.js'), $.Deferred(function (deferred) {
            $(deferred.resolve);
        })
    });

    //캘린더 날짜 초기화
    setInitDate();

    //팝업 위치 초기화
    setInitPosition();

    //첨부파일
    setFileInfo($('#realFileName').val(), $('#realFileSize').val(), $('input[type=file]'));
    
    //캘린더
    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' - ',
        startDate: new Date($('#startDate').val()),
        endDate: new Date($('#endDate').val()),
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
        $('#default-daterange input').val(getFormatRangeDate(start.format('YYYY.MM.DD'), end.format('YYYY.MM.DD')));
        $('#startDate').val(start.format('YYYY.MM.DD'));
        $('#endDate').val(end.format('YYYY.MM.DD'));

    }).find('input').val(getFormatRangeDate($('#startDate').val(), $('#endDate').val()));

    //input X버튼
    var $ipt = $('#fileName'),
        $clearIpt = $('#inputClear');
    $ipt.keyup(function () {
        $("#inputClear").toggle(Boolean($(this).val()));
    });

    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function () {
        $("#fileName").val('').focus();
        $(this).siblings('span.capacity').text('');
        $(this).hide();
    });

    //summernote 에디터
    $('.summernote').summernote({
        height: 300,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true                  // set focus to editable area after initializing summernote
    });

    //셀렉트 스킨Y 선택시 skin 생기게
    $('.hideSkin').hide();
    $(".selectSkin").on("change", function () {
        $(this).val("2").prop("selected", false);
        $('.hideSkin').show();
        $(this).find("option:eq(1)").prop("selected", true);
    });

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

    //저장
    $('[data-click="swal-success"]').click(function (e) {
        e.preventDefault();
        //전송값 셋팅
        $('#postStartDate').val($('#startDate').val().replace(/[.]/g, '') + '000000');
        $('#postFinishDate').val($('#endDate').val().replace(/[.]/g, '') + '235959');

        // 값 체크
        //제목
        if(isEmpty($('input[name=popupTitle]').val())) {
            
            swal({
                title: '제목을 입력해주세요.',
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
            return;
        }
        //팝업크기
        if(isEmpty($('input[name=popupWidth]').val()) || isEmpty($('input[name=popupHeight]').val())
            || $('input[name=popupWidth]').val() < 1 || $('input[name=popupHeight]').val() < 1) {
            
            swal({
                title: '팝업 크기를 입력해주세요.',
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
            return;
        }
        //내용
        if(isEmpty($('textarea[name=popupContents]').val()) || $('textarea[name=popupContents]').val() == '<p><br></p>') {
            
            swal({
                title: '내용을 입력해주세요.',
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
            return;
        }

        swal({
            title: '저장하시겠습니까?',
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
            if(isConfirm) {

                // summernote 이미지파일 첨부시 기본생성되는 태그 제거하여 에러방지
                $("input[name=files]").attr("disabled",true);

                var formData = new FormData($('form[name=formEdit]')[0]);

                $.ajax({
                    type: "POST",
                    enctype: "multipart/form-data",
                    url: "/service/popupSave",
                    processData: false,
                    contentType: false,
                    data: formData,
                    success: function (data) {
                        console.log(data.popupSeq );
                        if (Number(data.successCount) < 1) {
                            swal({title: '팝업 저장에 실패했습니다.',
                                // text: 'You will not be able to recover this imaginary file!',
                                icon: 'error',
                                buttons: {
                                    confirm: {
                                        text: '확인',
                                        value: true,
                                        visible: true,
                                        className: 'btn btn-primary',
                                        closeModal: true
                                    }
                                }
                            });
                        }else{
                            swal({
                                title: '팝업 저장에 성공하였습니다.',
                                // text: 'You will not be able to recover this imaginary file!',
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
                            }).then(function(isConfirm) {
                                //popup_seq 셋팅
                                //alert(data.popupSeq);
                                $('form[name=formEdit] input[name=popupSeq]').val(data.popupSeq);
                                //window.location.reload();
                            });

                        }
                    },
                    error: function (request,status,error) {
                        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

                        swal({
                            title: '팝업 저장에 실패했습니다.',
                            // text: 'You will not be able to recover this imaginary file!',
                            icon: 'error',
                            buttons: {
                                confirm: {
                                    text: '확인',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-primary',
                                    closeModal: true
                                }
                            }
                        });
                    }
                });
            }

        });

    });
    
    //목록으로 이동
    $('[data-click="swal-list"]').click(function (e) {
        e.preventDefault();

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
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        }).then(function (isConfirm) {
            if (isConfirm) {
                document.location.href = "#/service/servicePopupList";
            }
        });
    });
    
    //삭제
    $('[data-click="swal-danger"]').click(function (e) {
        e.preventDefault();

        swal({
            title: '삭제하시겠습니까?',
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
                
                $.ajax({
                    type: "POST",
                    url: "/service/removeServicePopup",
                    data: $('form[name=deleteForm]').serialize(),
                    dataType: "json",
                    success: function (data) {
                        console.debug(data);
                        if(Number(data.successCount) > 0) {
                            swal({
                                title: '팝업 삭제에 성공하였습니다.',
                                // text: 'You will not be able to recover this imaginary file!',
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
                                window.location.href = "#/service/servicePopupList";
                            });

                        }else{
                            swal({title: '팝업 삭제에 실패했습니다.',
                                // text: 'You will not be able to recover this imaginary file!',
                                icon: 'error',
                                buttons: {
                                    confirm: {
                                        text: '확인',
                                        value: true,
                                        visible: true,
                                        className: 'btn btn-primary',
                                        closeModal: true
                                    }
                                }
                            });

                        }

                    },
                    error: function (request,status,error) {
                        swal({
                            title: '팝업 삭제에 실패했습니다.',
                            // text: 'You will not be able to recover this imaginary file!',
                            icon: 'error',
                            buttons: {
                                confirm: {
                                    text: '확인',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-primary',
                                    closeModal: true
                                }
                            }
                        });
                    }
                });
            }
        });
    });
    //미리보기
    $('#previewBtn').click(function() {
        getPreview();
    });
});

function getFormatRangeDate(start, end) {
    return start + ' - ' + end;
}

function isEmpty(v) {
    return (v == null) || (v === '');
}

function setInitDate() {
    //isEmpty($('#startDate').val())?moment() || new Date($('#startDate').val())
    let startDate = $('#startDate').val() || moment().format('YYYY.MM.DD'); //yyyy.mm.dd 
    let endDate =  $('#endDate').val() || moment().add('days', 7).format('YYYY.MM.DD'); //yyyy.mm.dd 
    $('#startDate').val(startDate);
    $('#endDate').val(endDate);
}

function setInitPosition() {
    let positionCd = $(":input:radio[name=locationCd]:checked").val()

    if(isEmpty(positionCd)) {
        $('input:radio[name=locationCd]:input[value=02]').attr("checked", true);
    }

}

function getPreview() {
    let width = $('input[name=popupWidth]').val();
    let height = $('input[name=popupHeight]').val();

    let left = "40";
    let top = "40";

    let positionCd = $(":input:radio[name=locationCd]:checked").val()

    if(positionCd == '01') {
        left = "40";
    }else if(positionCd == '02') {
        left = ( screen.availWidth - width ) / 2;
    }else if(positionCd == '03') {
        left = screen.availWidth - width - 40;
    }

    var previewPopup = window.open('','popupPreview','left='+left+',top='+top+',width='+width+',height='+height+'');
    previewPopup.document.body.innerHTML = $('textarea[name=popupContents]').val();
    previewPopup.document.title = '팝업 미리보기';
}

function setFileInfo(filename, filesize, fileObj) {
    $(fileObj).siblings('.fileName').val(filename);
    $(fileObj).siblings('span.capacity').text("(" + formatBytes(filesize, 3) + " / 10MB)");
}