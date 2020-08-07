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
            data: 'JOINING_APPROVE_DTIME'
        }, {
            data: 'WITHDRAW_REQUEST_DTIME'
        }],
        columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.MEMBER_SEQ + '" id="memberSecessionList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="memberSecessionList_checkbox_' + meta.row + '">&nbsp;</label>';
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
            targets: [0, 1, 2, 3, 4, 5, 6],
            className: 'text-center'
        }]
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

    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    //테이블 조회갯수 지정
    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];

        oSettings._iDisplayLength = Number($("#selectLength option:selected").val());
        dataTable.draw();
    });

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


    function isModifyWithdrawMember() {

        var memberSeqs = "";

        $('input:checkbox[name=checkkey]:checked').each(function (index, item) {
            memberSeqs += ((memberSeqs == '') ? '' : ',') + $(this).val();
        });

        if (memberSeqs == "") {
            swal({
                title: '선택하신 회원이 없습니다.',
                text: '탈퇴 승인을 하시려면 회원을 선택해주세요.',
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
            return memberSeqs;
        }
    }

    $('[data-click="swal-secession"]').click(function (e) {
        e.preventDefault();

        var memberSeqs = isModifyWithdrawMember();

        if (memberSeqs === '') {
            return false;
        }

        swal({
            title: '탈퇴 승인하시겠습니까?',
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
                    memberSeqs: memberSeqs
                };

                $.ajax({
                    url: '/servlet/member/modifyWithdrawMember',
                    contentType: 'application/json',
                    type: 'POST',
                    data: JSON.stringify(param),
                    success: function (data) {
                        if (Number(data.successCount) < 1) {
                            swal({
                                title: '승인에 실패했습니다.',
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
                            title: '승인이 완료되었습니다.',
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
            console.log(data);
            dt = JSON.parse(data.member)[0];
            setDetail(dt);

            //modal 활성
            $('#modal-message01').modal('show');

        },
        error: function () {
            console.log('error');
        }
    });
}

// modal에 입력
function setDetail(df) {

    var form = $("#modal-message01");
    var keys = Object.keys(dt);

    // modal form값에 해당 키값의 데이터 반복문으로 넣기
    // ex) $(form).find("#member_name").text(dt['MEMBER_NAME']);
    for (var i = 0; i < keys.length; i++) {
        $(form).find("#" + keys[i].replace(/_/g, '').toLowerCase()).text(dt[keys[i].toUpperCase()]);
    }
}