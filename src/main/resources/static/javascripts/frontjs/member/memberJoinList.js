//dataTable 변수선언
var dataTable;
var bRunning = false;

$(document).ready(function () {
    //dataTable 생성
    dataTable = $('#dataTable').DataTable({
        dom: 'Blfrtip',
        //addTableClass: 'col-lg-12',
        lengthChange: false,
        ordering: false,
        initialLoad: false,
        pageLength: 20,
        buttons: [

        ],
        ajax: {
            "url": "/servlet/member/ajaxMemberList",
            "type": "POST",
            "data": function (d) {
                d.channelSeq = $("#channelSeq").val();
                d.searchField = $("#searchField").val();
                d.searchKeyword = $("#searchKeyword").val();
                d.withdrawRequestYn = $("#withdrawRequestYn").val();
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {
                $('#totalCount').text(JSON.stringify(data.responseJSON.recordsTotal));
                $('#selectAll').prop("checked", false);
                bRunning = true;
            }
        },
        columns: [{
            data: ''
        }, {
            data: ''
        }, {
            data: 'MEMBER_ID'
        }, {
            data: ''
        }, {
            data: 'MEMBER_NAME'
        }, {
            data: 'POSITION_NAME'
        }, {
            data: 'JOINING_APPROVE_DTIME'
        }],
        columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.MEMBER_SEQ + '" id="memberJoinList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="memberJoinList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        }, {
            targets: 1,
            'render': function (data, type, row, meta) {
                var info = dataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        }, {
            targets: 3,
            render: function (data, type, row, meta) {
                return '<a href="javascript:getDetailList(\'' + row.MEMBER_SEQ + '\')"; class="badge badge-success">' + '상세보기' + '</a>';
            }
        }, {
            'targets': [0, 1, 2, 3, 4, 5, 6],
            'className': 'text-center'
        }]
    });

    $("#buttons-sms").on("click", function (event) {
        getSms();
    });

    $("#buttons-msg").on("click", function (event) {
        getMemo();
    });

    $("#buttons-mail").on("click", function (event) {
        getMail();
    });

    $("#buttons-excel").on("click", function (event) {
        doDownloadExcel();
    });

    $("#buttons-excelLong").on("click", function (event) {
        doDownloadExcelAll();
    });

    // 검색버튼 클릭시
    $("#search").on("click", function (event) {
        getData();
    });

    $("#selectAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    //$('#dataTable_length').append('<p class="mb-0" style="line-height:34px">총<span id="total_count"></span>건</p>');
    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    //테이블 조회갯수 지정
    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];

        oSettings._iDisplayLength = Number($("#selectLength option:selected").val());
        dataTable.draw();

    });

    //검색항목에 enter key 입력 시  
    $('#searchKeyword').keypress(function (key) {
        if (key.keyCode == 13) { //키가 13이면 실행 (엔터는 13)            
            key.preventDefault();
            getData();
        }
    });
});

// 리스트 조회
function getData() {
    dataTable.draw();
}

// 상세 페이지 조회
function getDetailList(memberSeq) {
    var param = {
        memberSeq: memberSeq
    };

    $.ajax({
        url: '/servlet/member/ajaxMemberDetail',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(param),
        success: function (data) {
            dt = JSON.parse(data.member)[0];

            getModal(dt);

            //modal 활성
            $('#modal-message01').modal('show');

        },
        error: function () {
            console.log('error');
        }
    });
}

// modal 생성
function getModal(dt) {

    var form = $("#modal-message01");
    var keys = Object.keys(dt);

    // modal form값에 해당 키값의 데이터 반복문으로 넣기
    // ex) $(form).find("#member_name").text(dt['MEMBER_NAME']);
    for (var i = 0; i < keys.length; i++) {
        $(form).find("#" + keys[i].replace(/_/g, '').toLowerCase()).text(dt[keys[i].toUpperCase()]);
    }

}

// check box seq값 생성
function getCheckSeqs() {

    var values = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        values += ((values == '') ? '' : ',') + $(this).val();
    });

    return values;
}

//sms modal 생성
function getSms() {
    var strs = getCheckSeqs();

    if (strs == '') {

        swal({
            title: '선택하신 항목이 없습니다.',
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

    } else {
        //modal 활성
        getSmsMemberList(strs);
        $('#buttonsSms').modal('show');
    }

}

//쪽지 modal 생성
function getMemo() {
    var strs = getCheckSeqs();

    if (strs == '') {

        swal({
            title: '선택하신 항목이 없습니다.',
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

    } else {
        //modal 활성
        getMemoMemberList(strs);
        $('#buttonsMemo').modal('show');
    }
}

//메일 modal 생성
function getMail() {
    var strs = getCheckSeqs();

    if (strs == '') {
        swal({
            title: '선택하신 항목이 없습니다.',
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

    } else {
        //modal 활성
        getMailMemberList(strs);
        //modal 활성
        $('#buttonsMail').modal('show');
    }

}

//엑셀 다운로드
function doDownloadExcel() {
    var strs = getCheckSeqs();

    if (strs == '') {

        swal({
            title: '선택하신 항목이 없습니다.',
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

    } else {
        var url = $("#searchForm").serialize();
        url += "&gubun=select&memberSeqs=" + strs;
        url = decodeURIComponent(url);

        $.download('/member/getExcelMemberJoinList', url, 'post');
    }
}

//엑셀(전체) 다운로드
function doDownloadExcelAll() {
    var url = $("#searchForm").serialize();
    url += "&gubun=all";
    url = decodeURIComponent(url);
    $.download('/member/getExcelMemberJoinList', url, 'post');
}

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

//모달 input X버튼
var $ipt = $('.searchInput'),
    $clearIpt = $('.searchClear');
$ipt.keyup(function () {
    $(".searchClear").toggle(Boolean($(this).val()));
});

$clearIpt.toggle(Boolean($ipt.val()));
$clearIpt.click(function () {
    $(".searchInput").val('').focus();
    $(this).hide();
});