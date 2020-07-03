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
        "url": "/service/ajaxServiceSurveyList",
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
        data: 'POST_YN'
    }, {
        data: 'POLL_START_DATE'
    }, {
        data: 'POLL_FINISH_DATE'
    }, {
        data: 'POLL_STATUS'
    }, {
        data: 'REG_MEMBER_NAME'
    }, {
        data: 'REG_DTIME'
    }, {
        data: 'POLL_COUNT'
    }, {
        data: 'HIT'
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.POLL_SEQ + '" id="mainKeywordList_checkbox_' + meta.row + '" name="checkkey" />';
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
                var pollTimeStatus = '';
                var linkURL = '';

                switch (String(row.POLL_TIME)) {
                    case '0':
                        pollTimeStatus = '<span class="ml-2 badge badge-waiting">대기중</span>';
                        break;
                    case '1':
                        pollTimeStatus = '<span class="ml-2 badge badge-success">진행중</span>';
                        break;
                    case '-1':
                        pollTimeStatus = '<span class="ml-2 badge badge-secondary">종료</span>';
                        break;
                }

                if (String(row.POST_YN)==='Y') {
                    linkURL = '/service/serviceSurveyDetail';
                } else {
                    linkURL = '/service/serviceSurveyRegister';
                }

                return "<a href=" + linkURL + "?pollSeq=" + row.POLL_SEQ + " data-toggle='ajax'>" + row.POLL_TITLE + "</a>" + pollTimeStatus;
            }
        },
        {
            'targets': [2],
            'className': 'dt-body-left'
        },
        {
            'targets': [0, 1, 3, 4, 5, 6, 7, 8, 9, 10],
            'className': 'dt-body-center'
        }
    ]
});

$(document).ready(function () {

    dataTable.settings()[0].oLanguage.sEmptyTable = '등록된 설문이 없습니다.';

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

function removeServiceSurvey() {

    if ($('#totalCount').text() === '0') {
        return false;
    }
    
    if ($('input:checkbox[name=checkkey]:checked').length < 1) {
        swal({
            title: '선택된 설문이 없습니다.',
            text: '삭제할 설문을 선택해주세요.',
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
            var pollSeqs = [];

            $('input:checkbox[name=checkkey]:checked').each(function () {
                pollSeqs.push($(this).val());
            });

            $.ajax({
                type: "POST",
                url: "/service/removeServiceSurvey",
                data: "pollSeqs=" + pollSeqs,
                success: function (data) {

                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '설문 삭제에 실패했습니다.',
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
                        title: '선택하신 설문을 삭제했습니다.',
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
                        title: '설문 삭제에 실패했습니다.',
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


};