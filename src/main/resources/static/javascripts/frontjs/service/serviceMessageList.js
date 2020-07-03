$(document).ready(function () {

    // 내용 4000자 제한
    $("#mailContent").attr("maxlength", 4000);
    $("#memoContent").attr("maxlength", 4000);

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

    //모달 추가버튼 x버튼
    $('.modalInputClear').hide();
    $('.modalSearch').keyup(function () {
        $(this).siblings('.modalInputClear').toggle(Boolean($(this).val()));
    });
    $('.modalInputClear').click(function () {
        $(this).siblings('.modalSearch').val('').focus();
        $(this).hide();
    });

    //전체선택시
    $("#mailModalCheckAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[name=mailModalCheckBox]").prop("checked", true);
        } else {
            $("input[name=mailModalCheckBox]").prop("checked", false);
        }
    });
    $("#mailCheckAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[name=mailCheckBox]").prop("checked", true);
        } else {
            $("input[name=mailCheckBox]").prop("checked", false);
        }
    });
    $("#memoModalCheckAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[name=memoModalCheckBox]").prop("checked", true);
        } else {
            $("input[name=memoModalCheckBox]").prop("checked", false);
        }
    });
    $("#memoCheckAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[name=memoCheckBox]").prop("checked", true);
        } else {
            $("input[name=memoCheckBox]").prop("checked", false);
        }
    });

    $("#mailSelectLength").on("change", function (event) {

        var oSettings = mailDataTable.settings()[0];
        var len = Number($("#mailSelectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#mailTotalCount").text() : len;

        mailDataTable.draw();
    });
    $("#memoSelectLength").on("change", function (event) {

        var oSettings = memoDataTable.settings()[0];
        var len = Number($("#memoSelectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#memoTotalCount").text() : len;
        
        memoDataTable.draw();
    });
    $("#mailModalSelectLength").on("change", function (event) {

        var oSettings = mailModalDataTable.settings()[0];
        var len = Number($("#mailModalSelectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#mailModalTotalCount").val() : len;

        mailModalDataTable.draw();
    });
    $("#memoModalSelectLength").on("change", function (event) {

        var oSettings = memoModalDataTable.settings()[0];
        var len = Number($("#memoModalSelectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#memoModalTotalCount").val() : len;

        memoModalDataTable.draw();
    });

    // 검색버튼 클릭시
    $("#mailModalSearchBtn").on("click", function (event) {
        event.preventDefault();
        mailModalDataTable.draw();
    });
    $("#memoModalSearchBtn").on("click", function (event) {
        event.preventDefault();
        memoModalDataTable.draw();
    });
    
    $("#mailModalSearchKw").keydown(function (key) {
        if (key.keyCode === 13) {
            mailModalDataTable.draw();
        }
    });
    $("#memoModalSearchKw").keydown(function (key) {
        if (key.keyCode === 13) {
            memoModalDataTable.draw();
        }
    });
});

function doSendMail() {

    if ($("#mailTbody").find(".dataTables_empty").length > 0) {
        
        swal({
            title: '메일 받을 사람을 추가해주세요.',
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

    if (isEmpty($("#mailSubject").val())) {
        
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
    if (isEmpty($("#mailContent").val())) {
        
        swal({
            title: '내용을 입력해주세요.',
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

    swal({
        title: '이메일을 발송 하시겠습니까?',
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

            var memberSeqs = '';

            $("input:checkbox[name=mailCheckBox]").each(function () {
                memberSeqs += $(this).val() + ",";
            });

            memberSeqs.substring(0,memberSeqs.length - 1);

            var param = {
                memberSeqs,
                content: $("#mailContent").val(),
                subject: $("#mailSubject").val()
            };

            $.ajax({
                url: '/mail/setMail',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(param),
                success: function (data) {
                    swal({
                        title: '완료되었습니다.',
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
                            window.location.reload();
                        };
                    });
                },
                error: function () {
                    console.log('error');
                }
            });
        }
    });

}


function doSendMemo() {

    if ($("#memoTbody").find(".dataTables_empty").length > 0) {
        
        swal({
            title: '쪽지 받을 사람을 추가해주세요.',
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

    if (isEmpty($("#memoContent").val())) {
        
        swal({
            title: '내용을 입력해주세요.',
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

    swal({
        title: '쪽지를 발송 하시겠습니까?',
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

            var memberSeqs = '';

            $("input:checkbox[name=memoCheckBox]").each(function () {
                memberSeqs += $(this).val() + ",";
            });

            memberSeqs.substring(0,memberSeqs.length - 1);

            var param = {
                memberSeqs,
                content: $("#memoContent").val()
            };

            $.ajax({
                url: '/memo/setMemo',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(param),
                success: function (data) {
                    swal({
                        title: '완료되었습니다.',
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
                            window.location.reload();
                        };
                    })
                },
                error: function () {
                    console.log('error');
                }
            });
        }
    });

}

function addMember(messageKind) {

    if ($("input:checkbox[name=" + messageKind + "ModalCheckBox]:checked").length < 1) {
        swal({
            title: "추가할 사람을 선택해주세요.",
            text: "",
            icon: "info",
            buttons: {
                confirm: {
                    text: "확인",
                    value: true,
                    visible: true,
                    className: "btn btn-info",
                    closeModal: true
                }
            }
        });
        return false;
    }

    var selectList = [];

    $("input:checkbox[name=" + messageKind + "ModalCheckBox]:checked").each(function () {
        $("#" + messageKind + "Tbody").find(".dataTables_empty").parent().remove();

        var tr = $(this).parent().parent().parent().clone();
        tr.find("input[type=checkbox]").attr("name", messageKind + "CheckBox");
        selectList.push(tr);
    });

    selectList.forEach((element, index, array) => {
        element.appendTo("#" + messageKind + "Tbody");
    })

    setTableIndex(messageKind);

    $("#" + messageKind + "Modal-addMember").modal("hide");
}

function removeMember(messageKind) {

    if ($("#" + messageKind + "Tbody").find(".dataTables_empty").length > 0) {
        return false;
    }

    if ($("input:checkbox[name=" + messageKind + "CheckBox]:checked").length < 1) {

        swal({
            title: '삭제할 사람을 선택해주세요.',
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

            $("input:checkbox[name=" + messageKind + "CheckBox]:checked").each(function () {
                $(this).parent().parent().parent().remove();
            });

            setTableIndex(messageKind);

        }
    });

}

function setTableIndex(messageKind) {

    var table = $("#" + messageKind + "Tbody");

    for (var i = 0; i < table.children().length; i++) {
        var tr = table.children().eq(i);
        tr.find("input[type=checkbox]").attr("id", messageKind + "CheckBox" + i);
        tr.find("label").attr("for", messageKind + "CheckBox" + i);
        tr.children().eq(1).text(i + 1);
    }

    if (table.children().length < 1) {
        table.append("<tr class='odd'><td valign='top' colspan='11' class='dataTables_empty text-center'>데이터가 없습니다.</td></tr>");
    }

}

var bRunningMailModal = false;
var bRunningMemoModal = false;
var bRunningMail = false;
var bRunningMemo = false;

//mailModalDataTable 생성
var mailModalDataTable = $('#mailModalDataTable').DataTable({
    dom: 'Blfrtip',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/service/ajaxServiceMessageList",
        "type": "POST",
        "data": function (d) {
            d.dataKind = "member";
            d.searchKw = $("#mailModalSearchKw").val();
            d.searchField = $("#mailModalSearchField").val();
            d.bRunning = bRunningMailModal;
        },
        dataSrc: "data",
        complete: function (data) {
            $("#mailModalTotalCount").text(data.responseJSON.recordsTotal);
            $('#mailModalCheckAll').prop("checked", false);
            bRunningMailModal = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: ''
    }, {
        data: 'MEMBER_ID'
    }, {
        data: 'MEMBER_NAME'
    }, {
        data: 'MEMBER_NICKNAME'
    }, {
        data: 'MEMBER_STATUS_NM'
    }, {
        data: 'MEMBER_LEVEL_NM'
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '<input type="checkbox" value="' + row.MEMBER_SEQ + '" id="mailModalCheckBox' + meta.row + '" name="mailModalCheckBox" />';
                html += '<label for="mailModalCheckBox' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        },
        {
            targets: 1,
            'render': function (data, type, row, meta) {
                var info = mailModalDataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            'targets': [0, 1, 2, 3, 4, 5, 6],
            'className': 'text-center'
        }
    ]
});

//memoModalDataTable 생성
var memoModalDataTable = $('#memoModalDataTable').DataTable({
    dom: 'Blfrtip',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/service/ajaxServiceMessageList",
        "type": "POST",
        "data": function (d) {
            d.dataKind = "member";
            d.searchKw = $("#memoModalSearchKw").val();
            d.searchField = $("#memoModalSearchField").val();
            d.bRunning = bRunningMemoModal;
        },
        dataSrc: "data",
        complete: function (data) {
            $("#memoModalTotalCount").text(data.responseJSON.recordsTotal);
            $('#memoModalCheckAll').prop("checked", false);
            bRunningMemoModal = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: ''
    }, {
        data: 'MEMBER_ID'
    }, {
        data: 'MEMBER_NAME'
    }, {
        data: 'MEMBER_NICKNAME'
    }, {
        data: 'MEMBER_STATUS_NM'
    }, {
        data: 'MEMBER_LEVEL_NM'
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '<input type="checkbox" value="' + row.MEMBER_SEQ + '" id="memoModalCheckBox' + meta.row + '" name="memoModalCheckBox" />';
                html += '<label for="memoModalCheckBox' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        },
        {
            targets: 1,
            'render': function (data, type, row, meta) {
                var info = memoModalDataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            'targets': [0, 1, 2, 3, 4, 5, 6],
            'className': 'text-center'
        }
    ]
});

//mailDataTable 생성
var mailDataTable = $('#mailDataTable').DataTable({
    dom: 'Blfrtip',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/service/ajaxServiceMessageList",
        "type": "POST",
        "data": function (d) {
            d.dataKind = "mail";
            d.bRunning = bRunningMail;
        },
        dataSrc: "data",
        complete: function (data) {
            $("#mailTotalCount").text(data.responseJSON.recordsTotal);
            bRunningMail = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: 'MEMBER_NAME'
    }, {
        data: 'MAIL_TITLE'
    }, {
        data: 'REG_MEMBER_NAME'
    }, {
        data: 'REG_DTIME'
    }],
    columnDefs: [
        {
            targets: 0,
            'render': function (data, type, row, meta) {
                var info = mailDataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            'targets': [0, 1, 3, 4],
            'className': 'dt-body-center'
        },
        {
            'targets': [2],
            'className': 'text-left pl-5'
        }
    ]
});


//memoDataTable 생성
var memoDataTable = $('#memoDataTable').DataTable({
    dom: 'Blfrtip',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/service/ajaxServiceMessageList",
        "type": "POST",
        "data": function (d) {
            d.dataKind = "memo";
            d.bRunning = bRunningMemo;
        },
        dataSrc: "data",
        complete: function (data) {
            $("#memoTotalCount").text(data.responseJSON.recordsTotal);
            bRunningMemo = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: 'MEMBER_NAME'
    }, {
        data: 'MEMO_CONTENTS'
    }, {
        data: 'REG_MEMBER_NAME'
    }, {
        data: 'REG_DTIME'
    }],
    columnDefs: [
        {
            targets: 0,
            'render': function (data, type, row, meta) {
                var info = memoDataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            'targets': [0, 1, 3, 4],
            'className': 'dt-body-center'
        },
        {
            'targets': [2],
            'className': 'text-left pl-5'
        }
    ]
});