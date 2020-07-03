//dataTable 변수선언
var dataTable;
var bRunning = false;


$(document).ready(function () {

    //dataTable 생성
    dataTable = $('#dataTable').DataTable({
        //addTableClass: 'col-lg-12',
        lengthChange: false,
        ordering: false,
        initialLoad: false,
        pageLength: 20,
        buttons: [

        ],
        ajax: {
            "url": "/site/board/ajaxSiteBoardList",
            "type": "POST",
            "data": function (d) {
                d.searchField = $("#searchField").val();
                d.searchKeyword = $("#searchKeyword").val();
                d.bRunning = bRunning;
                d.channelBbsSeq = $("#searchChannelBbsSeq").val();
            },
            dataSrc: "data",
            complete: function (data) {
                $('#totalCount').text(JSON.stringify(data.responseJSON.recordsTotal));
                bRunning = true;
            }
        },
        columns: [{
            data: ''
        }, {
            data: ''
        }, {
            data: 'BBS_NAME'
        }, {
            data: 'ARTICLE_TITLE'
        }, {
            data: 'REG_MEMBER_NAME'
        }, {
            data: 'REG_DTIME'
        }, {
            data: 'HIT'
        }],
        columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.CHANNEL_ARTICLE_SEQ + '" id="siteBoardList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="siteBoardList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        }, {
            targets: 1,
            'render': function (data, type, full, meta) {
                var info = dataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        }, {
            targets: 3,
            className: 'dt-body-left',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="#/site/board/siteBoardDetail?channelArticleSeq=' + row.CHANNEL_ARTICLE_SEQ + '">' + row.ARTICLE_TITLE + '</a>';
            }
        }, {
            targets: [0, 1, 2, 4, 5, 6],
            'className': 'text-center'
        }],
    });

    //$('#dataTable_length').append('<p class="mb-0" style="line-height:34px">총<span id="total_count"></span>건</p>');
    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    // initChart('<%= chartCircleStats%>', '<%= chartBarStats%>', '<%= chartCircleCost%>', '<%= chartBarCost%>');
    // 전체선택시
    $("#selectAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    //테이블 조회갯수 지정
    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];
        var len = Number($("#selectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#totalCount").text() : len;

        dataTable.draw();

    });

    //조회조건 지정
    $("#searchChannelBbsSeq").on("change", function (event) {
        dataTable.draw();

    });

    //검색항목에 enter key 입력 시  
    $('#searchKeyword').keypress(function (key) {
        if (key.keyCode == 13) { //키가 13이면 실행 (엔터는 13)
            key.preventDefault();
            getData();
        }
    });

    function isCheckedValue() {

        var seqs = "";

        $('input:checkbox[name=checkkey]:checked').each(function (index, item) {
            seqs += ((seqs == '') ? '' : ',') + $(this).val();
        });

        if (seqs == "") {
            swal({
                title: '정보를 선택하세요.',
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

            return '';
        } else {
            return seqs;
        }
    }

    $('[data-click="swal-move"]').click(function (e) {
        e.preventDefault();

        var channelArticleSeqs = isCheckedValue();

        if (channelArticleSeqs === '') {
            return false;
        }

        swal({
            title: '수정하시겠습니까?',
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

                var param = {
                    channelArticleSeqs: channelArticleSeqs,
                    channelBbsSeq: $("#moveChannelBbsSeq").val(),
                };

                $.ajax({
                    url: '/site/board/modifyChannelArticleBbs',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(param),
                    success: function (data) {
                        if (Number(data.successCount) < 1) {
                            swal({
                                title: '수정이 실패했습니다.',
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
                            title: '수정되었습니다.',
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
                        });
                        getData();
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            }
        });
    });

    $('[data-click="swal-danger"]').click(function (e) {
        e.preventDefault();

        var channelArticleSeqs = isCheckedValue();

        if (channelArticleSeqs === '') {
            return false;
        }

        swal({
            title: '삭제하시겠습니까?',
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

                var param = {
                    channelArticleSeqs: channelArticleSeqs,
                    channelBbsSeq: $("#moveChannelBbsSeq").val()
                };

                $.ajax({
                    url: '/site/board/removeChannelArticleBbs',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(param),
                    success: function (data) {

                        if (Number(data.successCount) < 1) {
                            swal({
                                title: '삭제에 실패했습니다.',
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
                            title: '삭제되었습니다.',
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
                        });
                        getData();
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            }
        });
    });
});

// 리스트 조회
function getData() {
    dataTable.ajax.reload();
}
