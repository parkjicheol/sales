var bRunning = false;

//dataTable 생성
var dataTable = $('#dataTable').DataTable({
    dom: 'Blfrtip',
    //addTableClass: 'col-lg-12',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/service/ajaxServiceEventList",
        "type": "POST",
        "data": function (d) {
            d.searchField = $("#searchField").val();
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
        data: 'EVENT_STATUS_NAME'
    }, {
        data: 'USE_YN'
    }, {
        data: 'REG_DTIME'
    }, {
        data: ''
    }, {
        data: 'EVENT_WIN_DATE'
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.EVENT_SEQ + '" id="serviceEventList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="serviceEventList_checkbox_' + meta.row + '">&nbsp;</label>';
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

                return "<a href='/service/serviceEventDetail?eventSeq=" + row.EVENT_SEQ + "' data-toggle='ajax'>" + row.EVENT_NAME + "</a>";
            }
        },
        {
            targets: 3,
            'render': function (data, type, row, meta) {

                return row.EVENT_START_DATE + " ~ " + row.EVENT_FINISH_DATE;
            }
        },
        {
            targets: 7,
            'render': function (data, type, row, meta) {
                if (isEmpty(row.EVENT_WIN_CONTENTS)) {
                    return "<a href='/service/serviceEventWinner?eventSeq=" + row.EVENT_SEQ + "' data-toggle='ajax'>" + "[작성]" + "</a>";
                } else {
                    return "<a href='/service/serviceEventWinner?eventSeq=" + row.EVENT_SEQ + "' data-toggle='ajax'>" + "[수정]" + "</a>";
                }
            }
        },
        {
            'targets': [2],
            'className': 'dt-body-left'
        },
        {
            'targets': [0, 1, 3, 4, 5, 6, 7, 8],
            'className': 'dt-body-center'
        }
    ]
});

$(document).ready(function () {

    dataTable.settings()[0].oLanguage.sEmptyTable = '등록된 이벤트가 없습니다.';

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

function removeServiceEvent() {

    if ($('#totalCount').text() === '0') {
        return false;
    }

    if ($('input:checkbox[name=checkkey]:checked').length < 1) {
        swal({
            title: '선택된 이벤트가 없습니다.',
            text: '삭제할 이벤트를 선택해주세요.',
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
            var eventSeqs = [];

            $('input:checkbox[name=checkkey]:checked').each(function () {
                eventSeqs.push($(this).val());
            });

            $.ajax({
                type: "POST",
                url: "/service/removeServiceEvent",
                data: "eventSeqs=" + eventSeqs,
                success: function (data) {

                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '이벤트 삭제에 실패했습니다.',
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
                        title: '선택하신 이벤트를 삭제했습니다.',
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
                        window.location.reload();
                    });
                },
                error: function (data) {
                    swal({
                        title: '이벤트 삭제에 실패했습니다.',
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
                    }).then(function (isConfirm) {
                        window.location.reload();
                    });
                }
            });
        }
    });


}