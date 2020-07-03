$(document).ready(function() {
		
    App.setPageTitle('Color Admin | General UI Elements');
    App.restartGlobalFunction();
    
    $.when($.getScript('../javascripts/plugins/highlight.js/highlight.min.js'), $.Deferred(function(deferred) {
        $(deferred.resolve);
    })).done(function() {
        $.getScript('../javascripts/plugins/js/render.highlight.js'), $.Deferred(function(deferred) {
            $(deferred.resolve);
        })
    });
    
    //첨부파일
    var uploadFile = $('.fileBox .uploadBtn');
        uploadFile.on('change', function () {
            if (window.FileReader) {
                var filename = $(this)[0].files[0].name;
                var fileSize = $($(this)[0].files[0].size);
            } else {
                var filename = $(this).val().split('/').pop().split('\\').pop();
            }
            $(this).siblings('.fileName').val(filename);
            
    });
    
    //첨부파일 x버튼
      $('.fileName').keyup(function() {
        $(this).siblings('.inputClear').toggle(Boolean($(this).val()));
    });
    
    $('.inputClear').click(function() {
        var attachKey = $('#imageAttach').val();
        $(this).siblings('.fileName').val('').focus();
        attachKey.val('');
        $('#imageAttachKey').val('');
    });	

    $('#saveSubmit').click(function(e) {
        e.preventDefault();
        
        doSubmit();
    });	

    //초기에 셋팅값으로 체크하도록
    //$("input[value=<%=loginBgImageType%>]").attr('checked', true);
    
    
});

function doSubmit() {

    var settingValue =$("input[name='loginBgImageType']:checked").val();
    $("input[name=settingValue]").val(settingValue);

    var formData = new FormData($("#formRegist")[0]);

    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: '/site/main/saveChannelMainSetting',
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {

            if (Number(data.successCount) < 1) {
                swal({
                    title: '메인화면저장이 실패되었습니다.',
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
                title: '메인화면이 등록되었습니다.',
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
                    window.location.href = "#/site/main/channelMainSetting";
                    location.reload();
                }
            });

            return false;
        },
        error: function (data) {
            swal({
                title: '메인화면저장이 실패되었습니다.',
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
