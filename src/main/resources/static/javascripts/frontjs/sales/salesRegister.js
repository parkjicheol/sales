var bRunning = false;

$(document).ready(function () {

    $('#datepicker-sales').datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'yyyy-mm-dd',
        language: 'kor'
    });

    //테이블 조회갯수 지정
    $("#fabricLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];
        var len = Number($("#selectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#totalCount").text() : len;

        dataTable.draw();

    });

    // modal-SearchCourse02Datatable 생성
    var fabricDatatable = $('#fabricDatatable').DataTable({
        dom: 'Blfrtip',
        addTableClass: 'col-lg-12 px-0',
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
            data: 'seq'
        },{
            data: 'fabricNo'
        }, {
            data: 'fabricName'
        }, {
            data: 'registerId'
        }, {
            data: 'registerDate'
        }],
        columnDefs: [{
            targets: 1,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="javascript:;" onclick="javascript:setFabric(\'' + row.seq + '\', \'' + row.fabricNo + '\', \'' + row.fabricName + '\')"">'+ row.fabricNo + '</a>';
            }
        }, {
            targets: 2,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="javascript:;" onclick="javascript:setFabric(\'' + row.seq + '\', \'' + row.fabricNo + '\', \'' + row.fabricName + '\')"">'+ row.fabricName + '</a>';
            }
        },
            {
                targets: [0, 3, 4],
                className: 'dt-body-center'
            }
        ]
    });

})

function setSalesRegister() {

    if (isEmpty($("#saleDate").val())) {
        swal({
            title: '매출 일자를 입력해주세요.',
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

    if (isEmpty($("#fabricNo").val())) {
        swal({
            title: '원단 품번을 입력해주세요.',
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

    if (isEmpty($("#fabricName").val())) {
        swal({
            title: '원단 품명을 입력해주세요.',
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

    var url = ($("#salesName").val() != undefined) ? "/sales/ajaxModify" : "/sales/ajaxRegister";

    $.ajax({
        type: "POST",
        url: url,
        data: $("#registerForm").serialize(),
        success: function (data) {
            data = JSON.parse(data)
            window.location.href = "#/sales/list";
        },
        error: function (data) {
            alert("원단 등록에 실패했습니다.");
        }
    });

}

function getSalesList() {
    swal({
        title: '목록으로 이동하시겠습니까?',
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
                className: 'btn btn-info',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {
        if (isConfirm) {
            window.location.href = "#/sales/list";
        }
    });
}

function setFabric(fabricSeq, fabricNo, fabricName) {

    $('#fabricSeq').val(fabricSeq);
    $('#fabricNo').val(fabricNo);
    $('#fabricName').val(fabricName);

    $('#modal-SearchFabric').modal('hide');

}