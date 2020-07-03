var dataTable;
var bRunning = false;

$(document).ready(function () {
    
    // dataTable 생성
    dataTable = $('#dataTable').DataTable({
        dom: 'Blfrtip',
        //addTableClass: 'col-lg-12',
        lengthChange: false,
        ordering: false,
        searching: false,
        initialLoad: false,
        buttons: [],
        ajax: {
            "url": "/study/status/ajaxStudyApprovalList",
            "type": "POST",
            "data": function (d) {
                let date = $('#default-daterange input').val();
                let arr = date.split("-");
                d.fixSectionYn = $("#fixSectionYn").val();//정기차수여부
                d.searchDateType = $("#searchDateType").val();
                d.strtDate = $("#strtDate").val(); // 시작일자
                d.finishDate = $("#finishDate").val(); // 종료일자
                d.laborYn = $("#laborYn").val();
                d.officeCode = $("#officeCode").val();//사업장명
                d.courseCode = $("#courseCode").val();//과정코드
                //사업주 지원여부 추가해야함
                d.courseKindCd = $("#courseKindCd").val();//과정구분
                d.firstApproveCd = $("#firstApproveCd").val();//1차승인
                d.finalApproveCd = $("#finalApproveCd").val();//최종승인
                d.searchField = $("#searchField").val();
                d.searchKeyword = $("#searchKeyword").val();
                d.studyTrainingKindCds = (function() {
                    var studyTrainingKindCdValue = '';
                    $('input:checkbox[name="studyTrainingKindCd"]:checked').each(function(index) {
                        studyTrainingKindCdValue += ((studyTrainingKindCdValue == '') ? '' : ',') + $('input[name="studyTrainingKindCd"]').eq(index).val();
                    });                    

                    return studyTrainingKindCdValue;
                })();


                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {                                         
                $('#total_count').text(JSON.parse(data.responseJSON.recordsTotal));
                $('#selectAll').prop("checked", false);

                $('#sectionCount').text(JSON.parse(data.responseJSON.statistics).SECTION_COUNT);
                $('#applyCount').text(JSON.parse(data.responseJSON.statistics).APPLY_COUNT);
                $('#eduCost').text(JSON.parse(data.responseJSON.statistics).EDU_COST);
                $('#majorRefundPrice').text(JSON.parse(data.responseJSON.statistics).MAJOR_REFUND_PRICE);
                $('#minorRefundPrice').text(JSON.parse(data.responseJSON.statistics).MINOR_REFUND_PRICE);
                $('#firstApproveCd01').text(JSON.parse(data.responseJSON.statistics).FIRST_APPROVE_CD_01);
                $('#finalApproveCd01').text(JSON.parse(data.responseJSON.statistics).FINAL_APPROVE_CD_01);
                $('#saleY').text(JSON.parse(data.responseJSON.statistics).SALE_Y);
                $('#firstApproveCd02').text(JSON.parse(data.responseJSON.statistics).FIRST_APPROVE_CD_02);
                $('#finalApproveCd02').text(JSON.parse(data.responseJSON.statistics).FINAL_APPROVE_CD_02);
                $('#firstApproveCd03').text(JSON.parse(data.responseJSON.statistics).FIRST_APPROVE_CD_03);
                $('#finalApproveCd03').text(JSON.parse(data.responseJSON.statistics).FINAL_APPROVE_CD_03);
                $('#firstApproveCd04').text(JSON.parse(data.responseJSON.statistics).FIRST_APPROVE_CD_04);
                $('#finalApproveCd04').text(JSON.parse(data.responseJSON.statistics).FINAL_APPROVE_CD_04);

                bRunning = true;
            }
        },
        "columns": [
            { data: '' }
            ,{ data: '' }
            , { data: 'CMPY_OFFICE_NAME' }
            , { data: '' }
            , { data: 'DEPT_NAME' }
            , { data: 'LOGIN_ID' }
            , { data: 'EMPLOYEE_NUM' }
            , { data: 'MEMBER_NAME' }
            , { data: '' }
            , { data: 'COURSE_CODE' }
            , { data: 'COURSE_NAME' }
            , { data: 'SECTION_SEQ' }
            , { data: 'SECTION_YEAR' }
            , { data: 'SECTION_NUM' }
            , { data: 'LABOR_REFUND_YN' }
            , { data: 'PAYMENT_KIND_NAME' }
            , { data: 'PAYMENT_METHOD_NAME' }
            , { data: 'ENTER_LESSON_KIND_NAME' }
            , { data: 'FIRST_APPROVE_NAME' }
            , { data: 'FINAL_APPROVE_NAME' }
            , { data: 'REAL_EDU_COST' }
            , { data: 'MAJOR_REFUND_PRICE' }
            , { data: 'MID_REFUND_PRICE' }
            , { data: 'MINOR_REFUND_PRICE' }
            , { data: 'APPLY_METHOD_KIND_CD' }
            , { data: 'STUDY_APPLY_NOTE' }
            , { data: '' }
            , { data: '' }
            , { data: '' }
            , { data: '' }
            , { data: '' }
            , { data: '' }
            , { data: '' }
            , { data: 'RECEIPT_YN' }
            , { data: 'RECEIPT_DATE' }
            , { data: 'SALE_OFFICE_NAME' }
            , { data: 'SALE_OFFICE_BSN' }
            , { data: 'STUDY_TRAINING_KIND_CD' }

        ],
        columnDefs: [{
            targets: 0
            , 'render': function (data, type, row, meta) {

                let html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" memberseq="'+ row.MEMBER_SEQ + '"  value="' + row.STUDY_APPLY_SEQ + '" id="studyApprovalList_checkbox_' + meta.row + '" name="checkkey">';
                html += '    <label for="studyApprovalList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';
                
                return html;
            }
        }, {
            targets: 1
            , 'render': function (data, type, row, meta) {
                var info = dataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            'targets': [0, 1, 2, 3, 4, 5]
            , 'className': 'text-center',
        },
        {
            targets: 3,
            'render': function (data, type, row, meta) {
              return row.OFFICE_BSN_1 + '-' + row.OFFICE_BSN_2 + '-' + row.OFFICE_BSN_3;
            }
        },
        {
            targets: 8,
            'render': function (data, type, row, meta) {
              return row.SSN_1 + '-' + row.SSN_2;
            }
        },
        // {
        //     targets: 28,
        //     'render': function (data, type, row, meta) {
        //       if(row.SALE_YN == 'Y') {
        //         return "Y";
        //       } else {
        //         return "N";
        //       } 
              
        //     }
        // },
        {
            targets: 26,
            'render': function (data, type, row, meta) {
              if(row.COSIGN_TRAINING_ATTACH_KEY == null ) {
                return "N";
              } else {
                return "Y";
              } 
              
            }
        },
        {
            targets: 27,
            'render': function (data, type, row, meta) {
              if(row.JOB_TYPE_JOIN_ATTACH_KEY == null ) {
                return "N";
              } else {
                return "Y";
              } 
              
            }
        },
        {
            targets: 28,
            'render': function (data, type, row, meta) {
              if(row.TRAINING_AGREE_ATTACH_KEY == null ) {
                return "N";
              } else {
                return "Y";
              } 
              
            }
        },
        {
            targets: 29,
            'render': function (data, type, row, meta) {
              if(row.JOB_ABILIITY_ACC_ATTACH_KEY == null ) {
                return "N";
              } else {
                return "Y";
              } 
              
            }
        },
        {
            targets: 30,
            'render': function (data, type, row, meta) {
              if(row.LABOR_SUPPORT_ATTACH_KEY == null ) {
                return "N";
              } else {
                return "Y";
              } 
              
            }
        },
        {
            targets: 31,
            'render': function (data, type, row, meta) {
              if(row.ENTER_LESSON_APPLY_ATTACH_KEY == null ) {
                return "N";
              } else {
                return "Y";
              } 
              
            }
        },
        {
            targets: 32,
            'render': function (data, type, row, meta) {
              if(row.WORK_PAY_SUPPORT_ATTACH_KEY == null ) {
                return "N";
              } else {
                return "Y";
              } 
              
            }
        },
        {
            'targets': [6]
            , 'className': 'dt-body-right'
        }
        ]
    });

    //courseSearch();

    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];

        oSettings._iDisplayLength = $("#selectLength option:selected").val();
        getData();
    });

    $("#selectLength1").on("change", function (event) {
        var oSettings = dataTable1.settings()[0];

        oSettings._iDisplayLength = $("#selectLength1 option:selected").val();
        getData1();
    });

    $("#buttons-excel").on("click", function (event) {
        createExcel();
    });

    $("#buttons-excelAll").on("click", function (event) {
        createExcelAll();
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

    $("a[name='selectCourseCode']").on("click", function (e) {
        e.preventDefault();

        $('#courseCode').val($(this).parents().attr('courseName'));
    });    

    var dateObj = new Date();
    dateObj = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), '01');
    
    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: moment(dateObj).add('months', 1).startOf('month').format('YYYY.MM.DD'),
        endDate:  moment(dateObj).add('months', 1).endOf('month').format('YYYY.MM.DD'),
        minDate: '01/01/2012',
        maxDate: '12/31/2029',
        showDropdowns: true,
        locale: {
            format: 'YYYY.MM.DD',
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
        $('#default-daterange input').val(start.format('YYYY.MM.DD ') + ' - ' + end.format('YYYY.MM.DD '));

        var studyStartDate = start.format('YYYYMMDD') + '0000';
        var studyFinishDate = end.format('YYYYMMDD') + '5959';

        $("#strtDate").val(studyStartDate);
        $("#finishDate").val(studyFinishDate);

    });

    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    $('#default-daterange input').val(moment(dateObj).add('months', 1).startOf('month').format('YYYY.MM.DD') + ' - ' + moment(dateObj).add('months', 1).endOf('month').format('YYYY.MM.DD'));
    $("#strtDate").val(moment(dateObj).add('months', 1).startOf('month').format('YYYYMMDD') + '0000');
    $("#finishDate").val(moment(dateObj).add('months', 1).endOf('month').format('YYYYMMDD') + '5959');
    
    // 전체선택시
    $("#selectAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
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

    //검색항목에 enter key 입력 시
    $("#searchKeyword").keydown(function (key) {
        if (key.keyCode == 13) {
            $("#search").click();
        }
    });
});

// 리스트 조회
function getData() {
    dataTable.ajax.reload();
}

function createExcel() {

    var studyApplySeqs = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
    });
    
    var url = $("#searchForm").serialize();
    if (studyApplySeqs != '') {
        url += "&gubun=select&studyApplySeqs=" + studyApplySeqs;
        url = decodeURIComponent(url);

        $.download('/study/status/excelStudyApprovalList', url, 'post');
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

function createExcelAll() {

    var studyApplySeqs = "";

    $('input:checkbox[name=checkkey]').each(function () {
        studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
    });

    var url = $("#searchForm").serialize();
    url += "&gubun=select&studyApplySeqs=" + studyApplySeqs + "&excelType=All";
    url = decodeURIComponent(url);

    $.download('/study/status/excelStudyApprovalList', url, 'post');
}


function doFirstApproveUpdate(firstApproveCd) {
    
    var studyApplySeqs = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
    });

    
    if (studyApplySeqs != '') {
        $.ajax({
            type: "POST",
            url: "/study/status/updateApproveCd",
            data: "studyApplySeqs=" + studyApplySeqs +"&firstApproveCd=" + firstApproveCd ,
            success: function (data) {
                if (Number(data.successCount) < 1) {
                    swal({
                        title : '처리에 실패하였습니다.',
                        icon : 'error',
                        buttons : {
                          confirm : {
                            text : '확인',
                            value : true,
                            visible : true,
                            className : 'btn btn-danger',
                            closeModal : true
                          }
                        }
                    });
                } else {
                    swal({
                        title : '수정 되었습니다.',
                        icon : 'success',
                        buttons : {
                          confirm : {
                            text : '확인',
                            value : true,
                            visible : true,
                            className : 'btn btn-primary',
                            closeModal : true
                          }
                        }
                    }).then(function (isConfirm) {
                        if (isConfirm) {    
                            getData();
                        }
                    });
                }

            }
        });   
    
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

//검색에서 과정검색
function courseSearch(){
    
    // dataTable 생성
    dataTable1 = $('#dataTableSearch').DataTable({
        dom: 'Blfrtip',
        addTableClass: 'col-lg-12',
        lengthChange: false,
        ordering: false,
        searching: false,
        initialLoad: false,
        buttons: [],
        ajax: {
            "url": "/study/status/ajaxStudyApprovalCourseList",
            "type": "POST",
            "data": function (d) {
                d.useYn = $("#useYn").val();
                d.courseCode = $("#courseCode").val();
                d.coursekindcd = $("#courseKindCd1").val();
                d.searchKeyword = $("#searchKeyword1").val();
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {
                $('#totalCount').text(JSON.stringify(data.responseJSON.count[0].PAGETOTALCOUNT));
                bRunning = true;
            }
        },
        "columns": [{
            data: ''
        }, {
            data: 'COURSE_CODE'
        }, {
            data: 'COURSE_NAME'
        }, {
            data: 'LABOR_REFUND_YN'
        }],
        columnDefs: [
            {
                targets: 0
                , 'render': function (data, type, row, meta) {
                    var info = dataTable1.page.info();
                    return info.recordsTotal - (info.page * info.length + meta.row);
                }
            },
            {
                'targets': [1]
                , 'className': 'dt-body-center'
            },
            {
                'targets': [3]
                , 'className': 'dt-body-center'
            }
        ]
    });
}

// 과정찾기 검색버튼 클릭시
$("#searchCourse").on("click", function (event) {
    getData1();
});

// 리스트 조회
function getData1() {
    dataTable1.ajax.reload();
}


$('[data-click="swal-cancelConfirm"]').click(function(e) {
    e.preventDefault();
    var studyApplySeqs = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
    });
    if (studyApplySeqs != '') {
        swal({
            title : '1차 수강 승인 취소를 하시겠습니까?',
            icon : 'error',
            buttons : {
              cancel : {
                text : '취소',
                value : null,
                visible : true,
                className : 'btn btn-default',
                closeModal : true,
              },
              confirm : {
                text : '확인',
                value : true,
                visible : true,
                className : 'btn btn-danger',
                closeModal : true
              }
            }
          }).then(function (isConfirm) {
            if (isConfirm) {
                doFirstApproveUpdate('03');
            }
          });
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
    
  });

  $('[data-click="swal-confirm"]').click(function(e) {
    e.preventDefault();
    var studyApplySeqs = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
    });
    
    if (studyApplySeqs != '') {
        swal({
        title : '1차 수강 승인을 하시겠습니까?',
        // text: 'You will not be able to recover this imaginary file!',
        icon : 'info',
        buttons : {
            cancel : {
            text : '취소',
            value : null,
            visible : true,
            className : 'btn btn-default',
            closeModal : true,
            },
            confirm : {
            text : '확인',
            value : true,
            visible : true,
            className : 'btn btn-info',
            closeModal : true
            }
        }
        }).then(function (isConfirm) {
        if (isConfirm) {
            doFirstApproveUpdate('02');
        }
        });
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
  });

    // check box seq값 생성
    function getCheckSeqs() {

        var values = "";

        $('input:checkbox[name=checkkey]:checked').each(function () {
            values += ((values == '') ? '' : ',') + $(this).attr("memberseq");
        });
       
        return values;

    }
    
    $("#buttons-sms").on("click", function (event) {
        getSms();
    });

    $("#buttons-msg").on("click", function (event) {
        getMemo();
    });

    $("#buttons-mail").on("click", function (event) {
        getMail();
    });


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
    
