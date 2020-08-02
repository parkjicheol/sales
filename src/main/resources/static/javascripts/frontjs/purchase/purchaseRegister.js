var bRunning = false;

$(document).ready(function () {

    $('#datepicker-purchase').datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'yyyy-mm-dd',
        language: 'kor'
    });

    $("#bank, #cash").on("keypress", null, function() {
       if((event.keyCode < 48) || (event.keyCode > 57))
           event.returnValue=false;
    });

    $("#bank, #cash").on("keyup", null, function () {
        var $input = $(this);
        $input.val($input.val().replace(/[^0-9]/g,""));
        var value = $input.val().replace(/,/gi, '');
        var num = value.replace(/(.)(?=(.{3})+$)/g,"$1,");
        $input.val(num);

        var bank = $('#bank').val().replace(/,/gi, '');
        var cash = $('#cash').val().replace(/,/gi, '');
        var total = String(Number(bank) + Number(cash)).replace(/(.)(?=(.{3})+$)/g,"$1,");
        $('#total').val(total);
    });

    //테이블 조회갯수 지정
    $("#companyLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];
        var len = Number($("#selectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#totalCount").text() : len;

        dataTable.draw();
    });

    // modal-SearchCourse02Datatable 생성
    var companyDatatable = $('#companyDatatable').DataTable({
        dom: 'Blfrtip',
        addTableClass: 'col-lg-12 px-0',
        lengthChange: false,
        ordering: false,
        searching: false,
        initialLoad: false,
        pageLength: 10,
        buttons: [],
        ajax: {
            "url": "/company/ajaxList",
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
            data: 'companyNo'
        }, {
            data: 'companyName'
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
                return '<a href="javascript:;" onclick="javascript:setCompany(\'' + row.seq + '\', \'' + row.companyNo + '\', \'' + row.companyName + '\')"">'+ row.companyNo + '</a>';
            }
        }, {
            targets: 2,
            className: 'dt-body-center',
            selector: 'td',
            render: function (data, type, row, meta) {
                return '<a href="javascript:;" onclick="javascript:setCompany(\'' + row.seq + '\', \'' + row.companyNo + '\', \'' + row.companyName + '\')"">'+ row.companyName + '</a>';
            }
        },
            {
                targets: [0, 3, 4],
                className: 'dt-body-center'
            }
        ]
    });

})

function setPurchaseRegister() {

    if (isEmpty($("#purchaseDate").val())) {
        swal({
            title: '매입 일자를 입력해주세요.',
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

    if (isEmpty($("#companyNo").val())) {
        swal({
            title: '사업자번호를 입력해주세요.',
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

    if (isEmpty($("#companyName").val())) {
        swal({
            title: '업체명을 입력해주세요.',
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

    var url = ($("#seq").val() == undefined || $("#seq").val() == '') ? "/purchase/ajaxRegister" : "/purchase/ajaxModify";

    var targetForm = $("#registerForm :input");
    $.each(targetForm, function (index, elem) {
        $(this).val($(this).val().replace(/,/g, ''));
    });

    $.ajax({
        type: "POST",
        url: url,
        data: $("#registerForm").serialize(),
        success: function (data) {
            data = JSON.parse(data)
            window.location.href = "#/purchase/list";
        },
        error: function (data) {
            alert("매입 등록에 실패했습니다.");
        }
    });

}

function getPurchaseList() {
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
            window.location.href = "#/purchase/list";
        }
    });
}

function setCompany(companySeq, companyNo, companyName) {

    $('#companySeq').val(companySeq);
    $('#companyNo').val(companyNo);
    $('#companyName').val(companyName);

    $('#modal-SearchCompany').modal('hide');

}