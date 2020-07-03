$(document).ready(function () {

    $("#openYn").on("change", function () {
        if ($(this).val() === 'Y') {
            $("#lineup").attr("readonly", false);
        } else if ($(this).val() === 'N') {
            $("#lineup").attr("readonly", "readonly");
        }
    })

})

function setMainKeyword() {


    if (isEmpty($("#keywordName").val())) {

        swal({
            title: '키워드명을 입력해주세요.',
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

    var action = isEmpty($("#keywordSeq").val()) ? "/site/main/setMainKeyword" : "/site/main/modifyMainKeyword";

    $.ajax({
        type: "POST",
        url: action,
        data: $("#search_form").serialize(),
        success: function (data) {
            if (Number(data.successCount) < 1) {
                swal({
                    title: '키워드 저장에 실패했습니다.',
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
                    window.location.href = "#/site/main/mainKeywordList";
                }
            });
        },
        error: function (data) {
            swal({
                title: '키워드 저장에 실패했습니다.',
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

function removeMainKeyword() {
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

            var keywordSeqs = [];
            keywordSeqs.push($("#keywordSeq").val());

            $.ajax({
                type: "POST",
                url: "/site/main/removeMainKeyword",
                data: $("#search_form").serialize() + "&keywordSeqs=" + keywordSeqs,
                success: function (data) {
                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '키워드 삭제에 실패했습니다.',
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
                        title: '키워드를 삭제했습니다.',
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
                            window.location.href = "#/site/main/mainKeywordList";
                        }
                    });
                },
                error: function (data) {
                    swal({
                        title: '키워드 삭제에 실패했습니다.',
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

function getMainKeywordList() {
    swal({
        title: '목록으로 이동하시겠습니까?',
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
            window.location.href = "#/site/main/mainKeywordList";
        }
    });
}