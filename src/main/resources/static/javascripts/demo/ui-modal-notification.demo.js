/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.4.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
 */

var handleGritterNotification = function () {
    $('#add-sticky')
        .click(
            function () {
                $.gritter
                    .add({
                        title: 'This is a sticky notice!',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus lacus ut lectus rutrum placerat. ',
                        image: '../assets/img/user/user-2.jpg',
                        sticky: true,
                        time: '',
                        class_name: 'my-sticky-class'
                    });
                return false;
            });
    $('#add-regular')
        .click(
            function () {
                $.gritter
                    .add({
                        title: 'This is a regular notice!',
                        text: 'This will fade out after a certain amount of time. Sed tempus lacus ut lectus rutrum placerat. ',
                        image: '../assets/img/user/user-3.jpg',
                        sticky: false,
                        time: ''
                    });
                return false;
            });
    $('#add-max')
        .click(
            function () {
                $.gritter
                    .add({
                        title: 'This is a notice with a max of 3 on screen at one time!',
                        text: 'This will fade out after a certain amount of time. Sed tempus lacus ut lectus rutrum placerat. ',
                        sticky: false,
                        image: '../assets/img/user/user-4.jpg',
                        before_open: function () {
                            if ($('.gritter-item-wrapper').length === 3) {
                                return false;
                            }
                        }
                    });
                return false;
            });
    $('#add-without-image').click(function () {
        $.gritter.add({
            title: 'This is a notice without an image!',
            text: 'This will fade out after a certain amount of time.'
        });
        return false;
    });
    $('#add-gritter-light')
        .click(
            function () {
                $.gritter
                    .add({
                        title: 'This is a light notification',
                        text: 'Just add a \'gritter-light\' class_name to your $.gritter.add or globally to $.gritter.options.class_name',
                        class_name: 'gritter-light'
                    });
                return false;
            });
    $('#add-with-callbacks')
        .click(
            function () {
                $.gritter
                    .add({
                        title: 'This is a notice with callbacks!',
                        text: 'The callback is...',
                        before_open: function () {
                            alert('I am called before it opens');
                        },
                        after_open: function (e) {
                            alert('I am called after it opens: \nI am passed the jQuery object for the created Gritter element...\n' +
                                e);
                        },
                        before_close: function (manual_close) {
                            var manually = (manual_close) ? 'The \'X\' was clicked to close me!' :
                                '';
                            alert('I am called before it closes: I am passed the jQuery object for the Gritter element... \n' +
                                manually);
                        },
                        after_close: function (manual_close) {
                            var manually = (manual_close) ? 'The \'X\' was clicked to close me!' :
                                '';
                            alert('I am called after it closes. ' +
                                manually);
                        }
                    });
                return false;
            });
    $('#add-sticky-with-callbacks')
        .click(
            function () {
                $.gritter
                    .add({
                        title: 'This is a sticky notice with callbacks!',
                        text: 'Sticky sticky notice.. sticky sticky notice...',
                        sticky: true,
                        before_open: function () {
                            alert('I am a sticky called before it opens');
                        },
                        after_open: function (e) {
                            alert('I am a sticky called after it opens: \nI am passed the jQuery object for the created Gritter element...\n' +
                                e);
                        },
                        before_close: function (e) {
                            alert('I am a sticky called before it closes: I am passed the jQuery object for the Gritter element... \n' +
                                e);
                        },
                        after_close: function () {
                            alert('I am a sticky called after it closes');
                        }
                    });
                return false;
            });
    $('#remove-all').click(function () {
        $.gritter.removeAll();
        return false;
    });
    $('#remove-all-with-callbacks')
        .click(
            function () {
                $.gritter
                    .removeAll({
                        before_close: function (e) {
                            alert('I am called before all notifications are closed.  I am passed the jQuery object containing all  of Gritter notifications.\n' +
                                e);
                        },
                        after_close: function () {
                            alert('I am called after everything has been closed.');
                        }
                    });
                return false;
            });
};

/**
 * 필수 구현 method
 * 
 * swal****BeforeAction()
 *  버튼 나오기 전 동작
 *  ex) validation check 등
 *  return값이 false면 버튼 나오지 않음
 * 
 * swal****AfterAction()
 *  버튼 누른 후 동작
 * 
 */
var handleSweetNotification = function () {
    $('[data-click="swal-primary"]').click(function (e) {
        e.preventDefault();
        var result = swalPrimaryBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: '저장되었습니다.',
            // text: 'You will not be able to recover this imaginary file!',
            // icon: 'info',
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
                swalPrimaryAfterAction();
            }
        });
    });

    $('[data-click="swal-info"]').click(function (e) {
        e.preventDefault();
        var result = swalInfoBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'info',
            buttons: {
                cancel: {
                    text: 'Cancel',
                    value: null,
                    visible: true,
                    className: 'btn btn-default',
                    closeModal: true,
                },
                confirm: {
                    text: 'Info',
                    value: true,
                    visible: true,
                    className: 'btn btn-info',
                    closeModal: true
                }
            }
        }).then(function (isConfirm) {
            if (isConfirm) {
                swalInfoAfterAction();
            }
        });
    });

    $('[data-click="swal-infoId"]').click(function (e) {
        e.preventDefault();
        var result = swalInfoIdBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: 'ID를 입력해주세요.',
            //text : 'You will not be able to recover this imaginary file!',
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
        }).then(function (isConfirm) {
            if (isConfirm) {
                swalInfoIdAfterAction();
            }
        });
    });

    $('[data-click="swal-infoPW"]').click(function (e) {
        e.preventDefault();
        var result = swalInfoPWBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: '비밀번호를 입력해주세요.',
            //text : 'You will not be able to recover this imaginary file!',
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
        }).then(function (isConfirm) {
            if (isConfirm) {
                swalInfoPWAfterAction();
            }
        });
    });

    $('[data-click="swal-success"]').click(function (e) {
        e.preventDefault();
        var result = swalSuccessBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: '저장되었습니다.',
            // text: 'You will not be able to recover this imaginary file!',
            icon: 'success',
            buttons: {
                /*
                 * cancel: { text: 'Cancel', value: null, visible: true,
                 * className: 'btn btn-default', closeModal: true, },
                 */
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
                swalSuccessAfterAction();
            }
        });
    });

    $('[data-click="swal-list"]').click(function (e) {
        e.preventDefault();
        var result = swalListBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: '목록으로 이동하시겠습니까?',
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
                    text: '확인',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        }).then(function (isConfirm) {
            if (isConfirm) {
                swalListAfterAction();
            }
        });
    });

    $('[data-click="swal-warning"]').click(function (e) {
        e.preventDefault();
        var result = swalWarningBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: '탈퇴 승인하시겠습니까?',
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
                    text: '확인',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        }).then(function (isConfirm) {
            if (isConfirm) {
                swalWarningAfterAction();
            }
        });
    });

    $('[data-click="swal-danger"]').click(function (e) {
        e.preventDefault();
        var result = swalDangerBeforeAction();
        if (result === false) {
            return false;
        }
        swal({
            title: '삭제 하시겠습니까?',
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
                swalDangerAfterAction();
            }
        });
    });
};

var Notification = function () {
    "use strict";
    return {
        // main function
        init: function () {
            handleGritterNotification();
            handleSweetNotification();
        }
    };
}();

$(document).ready(function () {
    Notification.init();
});