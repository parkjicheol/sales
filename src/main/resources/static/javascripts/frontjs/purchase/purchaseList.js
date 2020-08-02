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
    language: {
        "processing": "<img src='/javascripts/plugins/blueimp-file-upload/img/loading.gif' width='50px' />"
    },
    ajax: {
        "url": "/purchase/ajaxList",
        "type": "POST",
        "data": function (d) {
            d.startDate = $("#startDate").val();
            d.finishDate = $("#finishDate").val();
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
        data: 'purchaseDate'
    }, {
        data: 'companyNo'
    }, {
        data: 'companyName'
    }, {
        data: 'total'
    }, {
        data: 'bank'
    }, {
        data: 'cash'
    }, {
        data: 'billFlag'
    }, {
        data: 'pageFlag'
    }],
    columnDefs: [{
            targets: 0,
            render: function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.seq + '" id="purchaseList_checkbox_' + meta.row + '" name="checkKey" />';
                html += '    <label for="purchaseList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        }, {
            targets: 1,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return row.purchaseDate.substring(0, 10);
            }
        }, {
            targets: 2,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="#/purchase/detail?seq=' + row.seq + '">' + row.companyNo + '</a>';
            }
        }, {
            targets: 3,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="#/purchase/detail?seq=' + row.seq + '">' + row.companyName + '</a>';
            }
        }, {
            targets: 4,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return (row.billFlag == 0) ? '<span class="text-blue-darker">발행</span>' : '<span class="text-danger">미발행</span>';
            }
        }, {
            targets: 5,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return (row.pageFlag == 0) ? '<span class="text-blue-darker">전자</span>' : '<span class="text-danger">수기</span>';
            }
        }, {
            targets: [6, 7, 8],
            className: 'dt-body-right',
            render: $.fn.dataTable.render.number( ',')
        }
    ]
});

$(document).ready(function () {

    dataTable.settings()[0].oLanguage.sEmptyTable = '등록된 매입 내역이 없습니다.';

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

    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY-MM-DD',
        separator: ' to ',
        startDate: moment().subtract('month', 0),
        endDate: moment().subtract('month', 0),
        minDate: '2018-01-01',
        maxDate: '2039-12-31',
        showDropdowns: true,
        locale: {
            format: 'YYYY-MM-DD',
            "monthNames": [
                "1월",
                "2월",
                "3월",
                "4월",
                "5월",
                "6월",
                "7월",
                "8월",
                "9월",
                "10월",
                "11월",
                "12월"
            ]
        }
    }, function (start, end) {
        $('#default-daterange input').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));

        var studyStartDate = start.format('YYYY-MM-DD');
        var studyFinishDate = end.format('YYYY-MM-DD');

        $("#startDate").val(studyStartDate);
        $("#finishDate").val(studyFinishDate);

    });

});

function removeSales() {

    if ($('#totalCount').text() === '0') {
        return false;
    }
    
    if ($('input:checkbox[name=checkKey]:checked').length < 1) {
        swal({
            title: '선택된 매입 내역이 없습니다.',
            text: '삭제할 매입 내역을 선택해주세요.',
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
            var purchaseSeqs = [];

            $('input:checkbox[name=checkKey]:checked').each(function () {
                purchaseSeqs.push($(this).val());
            });

            $.ajax({
                type: "POST",
                url: "/purchase/ajaxRemove",
                data: "purchaseSeqs=" + purchaseSeqs,
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
                        title: '선택하신 매입 내역을 삭제했습니다.',
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
                        title: '매입 내역 삭제에 실패했습니다.',
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