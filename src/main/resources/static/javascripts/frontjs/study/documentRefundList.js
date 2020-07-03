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
        buttons: [],
        ajax: {
            "url": "/study/document/ajaxDocumentRefundList",
            "type": "POST",
            "data": function (d) {
                let date = $('#default-daterange input').val();
                let arr = date.split("-");
                d.searchDateType = $("#searchDateType").val();//학습시작일,종료일기준
                d.startDate = $("#startDate").val(); // 시작일자
                d.finishDate = $("#finishDate").val(); // 종료일자
                d.cmpyOfficeCode = $("#officeCode").val(); //사업장명
                d.laborYn = $("#laborYn").val(); //고용보험여부
                d.startDates = $("#startDates").val();
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {
                $('#totalCount').text(JSON.stringify(data.responseJSON.count[0].PAGETOTALCOUNT));
                $('#selectAll').prop("checked", false);
                bRunning = true;
            }
        },
        "columns": [
            { data: 'COURSE_CODE' }
            , { data: '' }
            , { data: 'STUDY_START_DATE' }
            , { data: 'CMPY_OFFICE_NAME' }
            , { data: 'SECTION_SEQ' }
            , { data: 'LEARNER_CNT' }
        ],
        columnDefs: [{
            targets: 0
            , 'render': function (data, type, full, meta) {
                let html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + (meta.row + meta.settings._iDisplayStart + 0) + '" id="documentDeclareListCheckbox' + meta.row + '" name="checkkey">';
                html += '    <label for="documentDeclareListCheckbox' + meta.row + '">&nbsp;</label>';
                html += '</div>';
                html += '<input type="hidden" name="course.course_codes" value="">';
                html += '<input type="hidden" id="cmpy_office_codes" name="course.cmpy_office_codes" value="' + full.CMPY_OFFICE_CODE + '">';
                html += '<input type="hidden" name="course.study_start_dates" value="' + full.STUDY_START_DATE.replace(/\./g, '') + '000000' + '">';
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
    //수료증 발급대장
    $("#doCompleteIssue").on("click", function (event) {
        
        if (BrowserDetect.browser !== 'Mozilla') {
            swal({
                title: 'IE에서만 제공되는 기능입니다.',
                text: 'IE에서만 위탁훈련 계약서를 출력하실 수 있습니다.',
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

            return;
        }
        
        
        if ($("input:checkbox[name=checkkey]").is(":checked") == true) {
            var popUp =  "certificateReport";
            window.open('', popUp, 'width=900, height=1000');
            var form = $('#formDocument');
            form.attr('target', '_blank');
            form.attr('method', 'POST');
            form.attr('action', 'http://meganext.megahrd.co.kr/common/ubireport/ubireport.jsp?jrf=report15&appMenuCode=015009002&appChannelSeq=112')
            form.submit();
        } else {
            swal({
                title: '선택된 내용이 없습니다.',
                text: '출력하실 내용을 선택해주세요.',
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
            return;
        }
        
    });
    // 인건비신청서
    $("#doLaborcostApp").on("click", function (event) {

        if (BrowserDetect.browser !== 'Mozilla') {
            swal({
                title: 'IE에서만 제공되는 기능입니다.',
                text: 'IE에서만 위탁훈련 계약서를 출력하실 수 있습니다.',
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

            return;
        }

        if ($("input:checkbox[name=checkkey]").is(":checked") == true) {
            var popUp = "laborCostReport";
            window.open('about:blank', popUp, 'width=900, height=1000');

            var form = $('#formDocument');
            form.attr('target', '_blank');
            form.attr('method', 'POST');
            form.attr('action', 'http://meganext.megahrd.co.kr/common/ubireport/ubireport.jsp?jrf=report18&appMenuCode=015009002&appChannelSeq=112');
            form.submit();
        } else {
            swal({
                title: '선택된 내용이 없습니다.',
                text: '출력하실 내용을 선택해주세요.',
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
            return;
        }
        
    });

    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: moment().subtract('days', 29),
        endDate: moment(),
        minDate: '2012/01/01',
        maxDate: '2029/12/31',
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

        $("#startDate").val(studyStartDate);
        $("#finishDate").val(studyFinishDate);

    });

    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    //날짜 디폴트 작업
    $('#default-daterange input').val(moment().format('YYYY.MM.01') + ' - ' + moment().format('YYYY.MM.31'));
    $("#strtDate").val(moment().format("YYYYMM")+'010000');
    $("#finishDate").val(moment().format('YYYYMM') +'315959');
    //전체선택시
    $("#selectAll").on("click", function (e) {
        if($(this).is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });
});

// 리스트 조회
function getData() {
    dataTable.ajax.reload();
}
