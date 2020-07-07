var bRunning = false;

//dataTable 생성
var dataTable = $('#dataTable').DataTable({
    dom: 'Blfrtip',
    //addTableClass: 'col-lg-12',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 10,
    buttons: [],
    ajax: {
        "url": "/fabric/ajaxList",
        "type": "POST",
        "data": function (d) {
            d.searchField = $("#searchField").val();
            d.searchKeyword = $("#searchKeyword").val();
            d.bRunning = bRunning;
        },
        dataSrc: "data",
        complete: function (data) {
            console.log(data);
            $('#totalCount').text(JSON.stringify(data.responseJSON.recordsTotal));
            $('#selectAll').prop("checked", false);
            bRunning = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: 'seq'
    },{
        data: 'fabricNo'
    }, {
        data: 'fabricName'
    }, {
        data: 'registerName'
    }, {
        data: 'registerDate'
    }],
    columnDefs: [{
            targets: 0,
            render: function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.seq + '" id="fabricList_checkbox_' + meta.row + '" name="checkKey" />';
                html += '    <label for="fabricList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        }, {
            targets: 2,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="#/fabric/detail?seq=' + row.seq + '">' + row.fabricNo + '</a>';
            }
        }, {
            targets: 3,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="#/fabric/detail?seq=' + row.seq + '">' + row.fabricName + '</a>';
            }
        },
        {
            targets: [0, 1, 4, 5],
            className: 'dt-body-center'
        }
    ]
});

$(document).ready(function () {

    dataTable.settings()[0].oLanguage.sEmptyTable = '등록된 원단이 없습니다.';

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

function removeFabric() {

    if ($('#totalCount').text() === '0') {
        return false;
    }
    
    if ($('input:checkbox[name=checkKey]:checked').length < 1) {
        swal({
            title: '선택된 원단이 없습니다.',
            text: '삭제할 원단을 선택해주세요.',
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
            var fabricSeqs = [];

            $('input:checkbox[name=checkKey]:checked').each(function () {
                fabricSeqs.push($(this).val());
            });

            $.ajax({
                type: "POST",
                url: "/fabric/ajaxRemove",
                data: "fabricSeqs=" + fabricSeqs,
                success: function (data) {

                    if (Number(data.successCount) < 1) {
                        swal({
                            title: ' 삭제에 실패했습니다.',
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
                        title: '선택하신 원단을 삭제했습니다.',
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
                        title: '원단 삭제에 실패했습니다.',
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