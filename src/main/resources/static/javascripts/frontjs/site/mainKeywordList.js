var bRunning = false;

//dataTable 생성
var dataTable = $('#keywordDataTable').DataTable({
    dom: 'Blfrtip',
    addTableClass: '',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/site/main/ajaxMainKeywordList",
        "type": "POST",
        "data": function (d) {
            d.openYn = $("#openYn").val();
            d.searchKeyword = $("#searchKeyword").val();
            d.bRunning = bRunning;
        },
        dataSrc: "data",
        complete: function (data) {
            $('#totalCount').text(JSON.stringify(data.responseJSON.recordsTotal));
            $('#selectAll').prop("checked", false);
            bRunning = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: ''
    }, {
        data: ''
    }, {
        data: ''
    }, {
        data: 'REG_DTIME'
    }, {
        data: 'OPEN_YN'
    }, {
        data: ''
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.KEYWORD_SEQ + '" id="mainKeywordList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="mainKeywordList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        },
        {
            targets: 1,
            'render': function (data, type, row, meta) {
                var info = dataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            targets: 2,
            'render': function (data, type, row, meta) {
                return "<a href='/site/main/mainKeywordDetail?keywordSeq=" + row.KEYWORD_SEQ + "' data-toggle='ajax'>" + row.KEYWORD_NAME + "</a>";
            }
        },
        {
            targets: 3,
            className: 'dotdot text-left pl-3',
            'render': function (data, type, row, meta) {
                return "<a href='" + row.KEYWORD_URL + "' target='_blank'>" + row.KEYWORD_URL + "</a>";
            }
        },
        {
            targets: 6,
            'render': function (data, type, row, meta) {
                var linup = row.LINEUP || '';
                if (String(row.OPEN_YN) === 'Y') {
                    return '<input id="lineup_' + meta.row + '" class="text-center" type="number" placeholder="' + linup + '">';
                } else {
                    return '<input id="lineup_' + meta.row + '" class="text-center" type="number" placeholder="' + linup + '" disabled>';
                }
            }
        },
        {
            'targets': [0, 1, 2, 4, 5, 6],
            'className': 'dt-body-center'
        }
    ]
});

$(document).ready(function () {

    dataTable.settings()[0].oLanguage.sEmptyTable = '등록된 키워드가 없습니다.';

    //input X버튼
    var $ipt = $('#searchKeyword'),
        $clearIpt = $('#searchClear');
    $ipt.keyup(function () {
        $("#searchClear").toggle(Boolean($(this).val()));
    });

    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function () {
        $("#searchKeyword").val('').focus();
        $(this).hide();
    });

    // 검색버튼 클릭시
    $("#search").on("click", function (event) {
        event.preventDefault();

        dataTable.draw();
    });

    //전체선택시
    $("#selectAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    //검색항목에 enter key 입력 시
    $("#searchKeyword").keydown(function (key) {
        if (key.keyCode === 13) {
            dataTable.draw();
        }
    });

    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    //테이블 조회갯수 지정
    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];
        var len = Number($("#selectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#totalCount").text() : len;

        dataTable.draw();

    });

});

function modifyMainKeywordLineup() {

    if ($('#totalCount').text() === '0') {
        return false;
    }

    var keywordSeqList = [];
    var lineupList = [];

    for (var i = 0; i < $('#totalCount').text(); i++) {
        keywordSeqList.push($('#mainKeywordList_checkbox_' + i).val());

        var lineupVal = $("#lineup_" + i).val() || $("#lineup_" + i).attr('placeholder');
        lineupList.push(lineupVal);
    }

    $.ajax({
        type: "POST",
        url: "/site/main/modifyMainKeywordLineup",
        data: "keywordSeqList=" + keywordSeqList + "&lineupList=" + lineupList,
        success: function (data) {

            if (Number(data.successCount) < 1) {
                swal({
                    title: '순서 저장에 실패했습니다.',
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
                    window.location.reload();
                }
            });
        },
        error: function (data) {
            swal({
                title: '순서 저장에 실패했습니다.',
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
    });
}


function removeMainKeyword() {

    if ($('input:checkbox[name=checkkey]:checked').length < 1) {
        swal({
            title: '선택된 키워드가 없습니다.',
            text: '삭제할 키워드를 선택해주세요.',
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
            var keywordSeqs = [];

            $('input:checkbox[name=checkkey]:checked').each(function () {
                keywordSeqs.push($(this).val());
            });

            $.ajax({
                type: "POST",
                url: "/site/main/removeMainKeyword",
                data: "keywordSeqs=" + keywordSeqs,
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
                        title: '선택하신 키워드를 삭제했습니다.',
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
    })
};