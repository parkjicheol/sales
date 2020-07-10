$(document).ready(function () {

    $('#datepicker-sales').datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'yyyy-mm-dd',
        language: 'kor'
    });

    // modal-SearchCourse02Datatable 생성
    var SearchCourse02Datatable = $('#SearchCourse02Datatable').DataTable({
        dom: 'Blfrtip',
        addTableClass: 'col-lg-12 px-0',
        lengthChange: false,
        ordering: false,
        searching: false,
        initialLoad: false,
        pageLength: 20,
        buttons: [],
        ajax: {
            "url": "/site/main/ajaxSearchCourseList",
            "type": "POST",
            "data": function (d) {
                d.courseKindCd = $("#search02CourseKindCd").val();
                d.searchField = $("#search02SearchField").val();
                d.useYn = $("#search02UseYn").val();
                d.searchKw = $("#search02SearchKw").val();
                d.bRunning = bRunningSearch02;
            },
            dataSrc: "data",
            complete: function (data) {
                $("#search02TotalCount").text(data.responseJSON.recordsTotal);
            }
        },
        "columns": [{
            data: ''
        }, {
            data: 'COURSE_KIND_NM'
        }, {
            data: 'COURSE_NAME'
        }, {
            data: 'LABOR_REFUND_YN'
        }],
        columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {
                var info = SearchCourse02Datatable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },{
            targets: 2,
            'render': function (data, type, row, meta) {
                return '<a href="javascript:;" onclick="fn:setPromotionCourse(\'' + row.COURSE_CODE + '\')"">'+ row.COURSE_NAME + '</a>';
            }
        },
            {
                'targets': [0, 1, 2, 3],
                'className': 'dt-body-center'
            }
        ]
    });

})

function setSalesRegister() {

    if (isEmpty($("#salesNo").val())) {
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

    if (isEmpty($("#salesName").val())) {
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

    var url = ($("#salesName").val() != '') ? "/sales/ajaxModify" : "/sales/ajaxRegister";

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