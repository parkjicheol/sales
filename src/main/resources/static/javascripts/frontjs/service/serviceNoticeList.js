//dataTable 변수선언
var dataTable;
var bRunning = false;

$(document).ready(function () {
    //dataTable 생성
    dataTable = $("#dataTable").DataTable({
        //addTableClass: "col-lg-12",
        lengthChange: false,
        ordering: false,
        searching: false,
        initialLoad: false,
        pageLength: 20,
        buttons: [],
        ajax: {
            "url": "/service/ajaxManageNoticeList",
            "type": "POST",
            "data": function (d) {
                d.channelNoticeKindCd = '01';
                d.topNoticeYn = 'N';
                d.searchType = $("#searchType").val();          //검색조건 (제목_내용, 제목, 내용, 작성자)
                d.searchInput = $("#searchInput").val();        //검색어
                d.topNoticeYn = 'N';
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {
                $('#totalCount').text(JSON.stringify(data.responseJSON.recordsTotal));
                // console.log(data);
                bRunning = true;
            }
        },
        columns: [
            { data: "" },
            { data: "" },
            { data: "" },
            { data: "HIT" },
            { data: "REG_DTIME" }
        ],
        columnDefs: [
            {
                targets: 0,
                'render': function (data, type, row, meta) {

                    var html = '';
                    if(row.TOPNOTICE_YN === 'N'){
                        html = '<div class="checkbox checkbox-css">';
                        html += '    <input type="checkbox" value="' + row.ARTICLE_SEQ + '" id="serviceNoticeList_checkbox' + meta.row + '" name="checkkey" />';
                        html += '    <label for="serviceNoticeList_checkbox_' + meta.row + '">&nbsp;</label>';
                        html += '</div>';
                    }

                    return html;
                }
            },
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    if (row.TOPNOTICE_YN == 'Y') {
                        return '탑공지'
                    } else {
                        var info = dataTable.page.info();
                        return info.recordsTotal - (info.page * info.length + meta.row);
                    }
                }
            },
            {
                targets: 2,
                className: 'text-left pl-5',
                selector: 'td',
                'render': function (data, type, row, meta) {
                    return "<a href='/service/serviceNoticeDetail?articleSeq=" + row.ARTICLE_SEQ + "' data-toggle='ajax'>" + safeReplaceTag(row.ARTICLE_TITLE) + "</a>";
                }
            },
            { targets: [0, 1, 3, 4], className: "dt-body-center" }
        ]
    });

    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    // 검색버튼 클릭시
    $("#search").on("click", function (event) {
        getData();
    });

    //검색항목에 enter key 입력 시
    $("#searchInput").keydown(function (key) {
        if (key.keyCode == 13) {
            getData();
        }
    });

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
        oSettings._iDisplayLength = Number($("#selectLength option:selected").val());
        dataTable.draw();

    });
    //input X버튼
    var $ipt = $('#searchInput'), $clearIpt = $('#searchClear');
    $ipt.keyup(function () {
        $("#searchClear").toggle(Boolean($(this).val()));
    });

    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function () {
        $("#searchInput").val('').focus();
        $(this).hide();
    });


});

// 리스트 조회
function getData() {
    dataTable.draw();
}

// checkbox channelseq값 생성
function getCheckSeqs() {
    var channelSeqList = [];

    $('input:checkbox[name=checkkey]:checked').each(function () {
        channelSeqList.push($(this).val());
    });
    
    return channelSeqList.join();
}

//channel list delete 실행
function deleteChannelSeq() {
    var strs = getCheckSeqs();
    var param = { articleSeqs: strs };

    console.log("articleSeqs logs : ", param)
    if (strs.length != 0) {
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
                $.ajax({
                    url: '/service/ajaxRemoveNoticeList',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(param),
                    success: function (data) {
                        console.log(data);
                        getData();
                    },
                    error: function () {
                        console.log('error');
                    }
                });
            }
        })
    } else {
        swal({
            title : '선택된 내용이 없습니다.',
            icon : 'info',
            buttons : {
              confirm : {
                text : '확인',
                value : null,
                visible : true,
                className : 'btn btn-info',
                closeModal : true
              }
            }
        })
        return;
    }

}