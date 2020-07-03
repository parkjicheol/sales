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
            "url": "/study/status/ajaxStudyStatusList",
            "type": "POST",
            "data": function (d) {
                //alert($("#courseKindCd").val());
                let date = $('#default-daterange input').val();
                let arr = date.split("-");
                d.courseKindCd = $("#courseKindCd").val();//과정구분
                d.strtDate = $("#strtDate").val(); // 시작일자
                d.finishDate = $("#finishDate").val(); // 종료일자
                d.searchExamYn = $("#searchExamYn").val();//시험응시여부
                d.searchTaskYn = $("#searchTaskYn").val();//과제제출여부
                d.searchDiscussYn = $("#searchDiscussYn").val();//토론참여여부
                d.officeCode = $("#officeCode").val();//사업장명
                d.searchField = $("#searchField").val();//검색조건
                d.searchKeyword = $("#searchKeyword").val();//검색입력    
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {                                         
                $('#total_count').text(data.responseJSON.recordsTotal);
                $('#selectAll').prop("checked", false);

                if (bRunning) {
                    $('#statusCountTable tbody').html('');
                }

                var len = data.responseJSON.courseReportSubListCnt.length;
                var html = (len === 0) ? '<tr class="odd"><td valign="top" colspan="9" class="dataTables_empty text-center">조회내용이 없습니다.</td></tr>' : '';
                var courseKindName = '';

                for (var i=0; i < len; i++) {

                    html += '<tr class="gradeX" role="row">';
                    if (data.responseJSON.courseReportSubListCnt[i].COURSE_KIND_CD == 'EL') {
                        courseKindName = '이러닝';
                    } else if(data.responseJSON.courseReportSubListCnt[i].COURSE_KIND_CD == 'PL') {
                        courseKindName = '북러닝';
                    }  else if(data.responseJSON.courseReportSubListCnt[i].COURSE_KIND_CD == 'LL') {
                        courseKindName = '전화/화상';
                    } else if(data.responseJSON.courseReportSubListCnt[i].COURSE_KIND_CD == 'OL') {
                        courseKindName = '집합';
                    } else if(data.responseJSON.courseReportSubListCnt[i].COURSE_KIND_CD == 'BL') {
                        courseKindName = '콜라보';
                    } 
                    
                    html += '    <td class="text-center">' + courseKindName + '<input type="hidden" id="courseKindCdCode' + i + '" value="' + data.responseJSON.courseReportSubListCnt[i].COURSE_KIND_CD + '"></td>';
                    html += '    <td id="sectionCnt' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].SECTION_CNT + '</td>';
                    html += '    <td id="learnerCnt' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].LEARNER_CNT + '</td>';
                    html += '    <td id="acgProgress' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].AVG_PROGRESS + '%</td>';
                    html += '    <td id="progressYn' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].PROGRESS_Y + '/' + data.responseJSON.courseReportSubListCnt[i].PROGRESS_N + '</td>';
                    html += '    <td id="examYn' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].EXAM_Y + '/' + data.responseJSON.courseReportSubListCnt[i].EXAM_N + '</td>';
                    html += '    <td id="taskYn' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].TASK_Y + '/' + data.responseJSON.courseReportSubListCnt[i].TASK_N + '</td>';
                    html += '    <td id="discussYn' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].DISCUSS_Y + '/' + data.responseJSON.courseReportSubListCnt[i].DISCUSS_N + '</td>';
                    html += '    <td id="totalYn' + i + '" class="text-center">' + data.responseJSON.courseReportSubListCnt[i].TOTAL_Y + '/' + data.responseJSON.courseReportSubListCnt[i].TOTAL_N + '</td>';
                    html += '</tr>';

                    // $('#courseKindCdCode' + i).text(data.responseJSON.courseReportSubListCnt[i].COURSE_KIND_CD);
                    // $('#sectionCnt' + i).text(data.responseJSON.courseReportSubListCnt[i].SECTION_CNT);
                    // $('#learnerCnt' + i).text(data.responseJSON.courseReportSubListCnt[i].LEARNER_CNT);
                    // $('#acgProgress' + i).text(data.responseJSON.courseReportSubListCnt[i].AVG_PROGRESS);
                    // $('#progressYn' + i).text(data.responseJSON.courseReportSubListCnt[i].PROGRESS_Y + '/' + data.responseJSON.courseReportSubListCnt[i].PROGRESS_N);
                    // $('#examYn' + i).text(data.responseJSON.courseReportSubListCnt[i].EXAM_Y + '/' + data.responseJSON.courseReportSubListCnt[i].EXAM_N);
                    // $('#taskYn' + i).text(data.responseJSON.courseReportSubListCnt[i].TASK_Y + '/' + data.responseJSON.courseReportSubListCnt[i].TASK_N);
                    // $('#discussYn' + i).text(data.responseJSON.courseReportSubListCnt[i].DISCUSS_Y + '/' + data.responseJSON.courseReportSubListCnt[i].DISCUSS_N);
                    // $('#totalYn' + i).text(data.responseJSON.courseReportSubListCnt[i].TOTAL_Y + '/' + data.responseJSON.courseReportSubListCnt[i].TOTAL_N);
                }

                if (bRunning) {
                    $('#statusCountTable tbody').html(html);
                }
              
                bRunning = true;
            }
        },
        "columns": [
            { data: '' }
            ,{ data: '' }
            , { data: 'COURSE_CODE' }
            , { data: 'COURSE_NAME' }
            , { data: '' }
            , { data: 'LOGIN_ID' }
            , { data: 'MEMBER_NAME' }
            , { data: '' }
            , { data: 'DEPT_NAME' }
            , { data: 'COMPANY_LABOR_REFUND_YN' }
            , { data: 'STUDY_TIME' }
            , { data: 'PROGRESS_POINT' }
            , { data: 'PROGRESS_POINT' }
            , { data: 'EXAM_POINT' }
            , { data: 'TASK_POINT' }
            , { data: 'DISCUSS_POINT' }
            , { data: 'TOTAL_POINT' }
            , { data: 'COMPLETION_STATUS_CD' }
            , { data: 'COMPLETION_STATUS_CD' }
            , { data: 'CMPY_OFFICE_NAME' }

        ],
        columnDefs: [{
            targets: 0
            , 'render': function (data, type, row, meta) {

                let html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" memberseq="'+ row.MEMBER_SEQ + '"  value="' + row.STUDY_APPLY_SEQ + '"  coursecode="'+ row.COURSE_CODE + '"  id="studyStatusList_checkbox_' + meta.row + '" name="checkkey">';
                html += '    <label for="studyStatusList_checkbox_' + meta.row + '">&nbsp;</label>';
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
            targets: 4,
            'render': function (data, type, row, meta) {
              return row.STUDY_START_DATE + '~' + row.STUDY_FINISH_DATE;
            }
        },
        {
            targets: 7,
            'render': function (data, type, row, meta) {
              if(row.SSN_1 == null|| row.SSN_2 ==null){
                row.SSN_1 ='';
              }
              if(row.SSN_2 ==null){
                row.SSN_2 ='';
              }
              return row.SSN_1 + '-' + row.SSN_2;
            }
        },
        {
            'targets': [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            'className': 'text-center',
        }
        ]
    });

    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];

        oSettings._iDisplayLength = $("#selectLength option:selected").val();
        getData();
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

    // $("a[name='selectCourseCode']").on("click", function (e) {
    //     e.preventDefault();

    //     $('#courseCode').val($(this).parents().attr('value'));
    // });    

    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: moment().add('months', -1).format('YYYY.MM.DD'),
        endDate: moment().add('months', 3).format('YYYY.MM.DD'),
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

    $('#default-daterange input').val(moment().add('months', -1).format('YYYY.MM.DD') + ' - ' + moment().add('months', 3).format('YYYY.MM.DD'));
    $("#strtDate").val(moment().add('months', -1).format("YYYYMMDD")+'0000');
    $("#finishDate").val(moment().add('months', 3).format('YYYYMMDD') +'5959');
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
    var memberSeqs = "";
    var courseCodes = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
        memberSeqs += ((memberSeqs == '') ? '' : ',') + $(this).attr("memberseq");
        courseCodes += ((courseCodes == '') ? '' : ',') + $(this).attr("coursecode");
        
    });
    
    var url = $("#searchForm").serialize();
    if (studyApplySeqs != '') {
        url += "&gubun=select&studyApplySeqs=" + studyApplySeqs +"&memberSeqs=" + memberSeqs + "&courseCodes=" + courseCodes;
        url = decodeURIComponent(url);

        $.download('/study/status/excelStudyStatusList', url, 'post');
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

    
    var url = $("#searchForm").serialize();
    url += "&gubun=all";
    url = decodeURIComponent(url);

    $.download('/study/status/excelStudyStatusList', url, 'post');
}


// function doFirstApproveUpdate(firstApproveCd) {
    
//     var studyApplySeqs = "";

//     $('input:checkbox[name=checkkey]:checked').each(function () {
//         studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
//     });

    
//     if (studyApplySeqs != '') {
//         $.ajax({
//             type: "POST",
//             url: "/study/status/updateApproveCd",
//             data: "studyApplySeqs=" + studyApplySeqs +"&firstApproveCd=" + firstApproveCd ,
//             success: function (data) {
//                 if (Number(data.successCount) < 1) {
//                     swal({
//                         title : '처리에 실패하였습니다.',
//                         icon : 'error',
//                         buttons : {
//                           confirm : {
//                             text : '확인',
//                             value : true,
//                             visible : true,
//                             className : 'btn btn-danger',
//                             closeModal : true
//                           }
//                         }
//                     });
//                 } else {
//                     swal({
//                         title : '수정 되었습니다.',
//                         icon : 'success',
//                         buttons : {
//                           confirm : {
//                             text : '확인',
//                             value : true,
//                             visible : true,
//                             className : 'btn btn-primary',
//                             closeModal : true
//                           }
//                         }
//                     }).then(function (isConfirm) {
//                         if (isConfirm) {    
//                             getData();
//                         }
//                     });
//                 }

//             }
//         });   
    
//     } else {
//         swal({
//             title : '선택된 내용이 없습니다.',
//             icon : 'info',
//             buttons : {
//               confirm : {
//                 text : '확인',
//                 value : null,
//                 visible : true,
//                 className : 'btn btn-info',
//                 closeModal : true
//               }
//             }
//         })
//         return;
//     }
// }



// $('[data-click="swal-cancelConfirm"]').click(function(e) {
//     e.preventDefault();
//     var studyApplySeqs = "";

//     $('input:checkbox[name=checkkey]:checked').each(function () {
//         studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
//     });
//     if (studyApplySeqs != '') {
//         swal({
//             title : '1차 수강 승인 취소를 하시겠습니까?',
//             icon : 'error',
//             buttons : {
//               cancel : {
//                 text : '취소',
//                 value : null,
//                 visible : true,
//                 className : 'btn btn-default',
//                 closeModal : true,
//               },
//               confirm : {
//                 text : '확인',
//                 value : true,
//                 visible : true,
//                 className : 'btn btn-danger',
//                 closeModal : true
//               }
//             }
//           }).then(function (isConfirm) {
//             if (isConfirm) {
//                 doFirstApproveUpdate('03');
//             }
//           });
//     } else {
//         swal({
//             title : '선택된 내용이 없습니다.',
//             icon : 'info',
//             buttons : {
//               confirm : {
//                 text : '확인',
//                 value : null,
//                 visible : true,
//                 className : 'btn btn-info',
//                 closeModal : true
//               }
//             }
//         })
//         return;
//     }
    
//   });

//   $('[data-click="swal-confirm"]').click(function(e) {
//     e.preventDefault();
//     var studyApplySeqs = "";

//     $('input:checkbox[name=checkkey]:checked').each(function () {
//         studyApplySeqs += ((studyApplySeqs == '') ? '' : ',') + $(this).val();
//     });
    
//     if (studyApplySeqs != '') {
//         swal({
//         title : '1차 수강 승인을 하시겠습니까?',
//         // text: 'You will not be able to recover this imaginary file!',
//         icon : 'info',
//         buttons : {
//             cancel : {
//             text : '취소',
//             value : null,
//             visible : true,
//             className : 'btn btn-default',
//             closeModal : true,
//             },
//             confirm : {
//             text : '확인',
//             value : true,
//             visible : true,
//             className : 'btn btn-info',
//             closeModal : true
//             }
//         }
//         }).then(function (isConfirm) {
//         if (isConfirm) {
//             doFirstApproveUpdate('02');
//         }
//         });
//     } else {
//         swal({
//             title : '선택된 내용이 없습니다.',
//             icon : 'info',
//             buttons : {
//               confirm : {
//                 text : '확인',
//                 value : null,
//                 visible : true,
//                 className : 'btn btn-info',
//                 closeModal : true
//               }
//             }
//         })
//         return;
//     }    
//   });

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
    
