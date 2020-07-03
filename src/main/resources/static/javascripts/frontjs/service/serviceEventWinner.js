$(document).ready(function () {

  // summernote 에디터
  $('.summernote').summernote({
    height: 300, // set editor height
    minHeight: null, // set minimum height of editor
    maxHeight: null, // set maximum height of editor
    focus: true // set focus to editable area after initializing summernote
  });

  //캘린더
  $('#datepicker-announce').datepicker({
    todayHighlight: true,
    autoclose: true,
    format: 'yyyy.mm.dd',
    language: 'kor'
  });
  

});

function modifyEventWinner() {

  if (isEmpty($("#eventWinDate").val())) {

    swal({
      title: '당첨자 발표일을 선택해주세요.',
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

  $("#eventWinDate").val($("#eventWinDate").val().replace('.','').replace('.','') + '235959');

  $.ajax({
    type: "POST",
    url: "/service/modifyEventWinner",
    data: $("#winnerForm").serialize(),
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