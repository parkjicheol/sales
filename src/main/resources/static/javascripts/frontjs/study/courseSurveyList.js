//dataTable 변수선언
var dataTable;
var myStatsBarChart;
var myRankBarChart;
var bRunning = false;

$(document).ready(function () {

    var ctx1 = document.getElementById('chartStatsBar').getContext('2d');
    myStatsBarChart = new Chart(ctx1, {
        type: 'bar',
        data: {}
    });

    var ctx2 = document.getElementById('chartRankBar').getContext('2d');
    myRankBarChart = new Chart(ctx2, {
        type: 'horizontalBar',
        data: {}
    });

    //dataTable 생성
    dataTable = $('#dataTable').DataTable({
        //addTableClass: 'col-lg-12',
        lengthChange: false,
        ordering: false,
        initialLoad: false,
        pageLength: 20,
        buttons: [

        ],
        ajax: {
            "url": "/study/report/ajaxCourseSurveyList",
            "type": "POST",
            "data": function (d) {
                d.searchKeyword = $("#searchKeyword").val();
                d.studyDateStandard = $("#studyDateStandard").val();
                d.strtDate = $("#strtDate").val();
                d.finishDate = $("#finishDate").val();  
                d.cmpyOfficeCode = $("#cmpyOfficeCode").val();
                d.courseTypeCd = $("#courseTypeCd").val();
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {
                if (bRunning) {

                    console.log('2. chartBarStats >>>'+data.responseJSON.chartBarStats);
                    console.log('2. chartBarRank >>>'+data.responseJSON.chartBarRank);

                    initChart(data.responseJSON.chartBarStats, data.responseJSON.chartBarRank);
                }
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
            data: 'COURSE_KIND_NM'
        }, {
            data: 'COURSE_NAME'
        }, {
            data: 'STUDY_START_DATE'
        }, {
            data: 'LEARNER_CNT'
        }, {
            data: 'JOINER_CNT'
        }, {
            data: 'JOINER_RATE'
        }, {
            data: 'AVG1'
        }, {
            data: 'AVG2'
        }, {
            data: 'AVG3'
        }, {
            data: 'AVG_CNT'
        }],
        columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.COURSE_CODE + '" id="courseSurveyList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="courseSurveyList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        }, {
            targets: 1,
            'render': function (data, type, full, meta) {
                var info = dataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        }, {
            targets: 4,
            'render': function (data, type, row, meta) {
                return row.STUDY_START_DATE + '~' + row.STUDY_FINISH_DATE;
            }
        }, {
            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            'className': 'text-center'
        }],
    });

    initChart(chartBarStats, chartBarRank);

    // 전체선택시
    $("#selectAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: moment().subtract('month', 1).date(1),
        endDate: moment().subtract('month', 0).date(0),
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
    
        $("#strtDate").val(studyStartDate);
        $("#finishDate").val(studyFinishDate);
    
    });

    $("#strtDate").val(moment().subtract('month', 1).date(1).format('YYYYMMDD') + '0000');
    $("#finishDate").val(moment().subtract('month', 0).date(0).format('YYYYMMDD') + '5959');
    $('#daterangeTxt').val(moment().subtract('month', 1).date(1).format('YYYY.MM.DD') + ' - ' + moment().subtract('month', 0).date(0).format('YYYY.MM.DD'));

    //테이블 조회갯수 지정
    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];
        var len = Number($("#selectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#totalCount").text() : len;

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
    dataTable.ajax.reload();
}

function initChart(chartStatsBar, chartRankItems) {

    chartStatsBar = JSON.parse(chartStatsBar.replace(/&#34;/gi, '\"'));
    chartRankItems = JSON.parse(chartRankItems.replace(/&#34;/gi, '\"'));

    //만족도 평균(100점 만점 환산)
    var charStatsBarContent = (typeof chartStatsBar['avg1'] != 'undefined') ? chartStatsBar['avg1'] : 0; //대기업 환급비
    var charStatsBarProf = (typeof chartStatsBar['avg2'] != 'undefined') ? chartStatsBar['avg2'] : 0; //중견기업 환급비
    var charStatsBarManage = (typeof chartStatsBar['avg3'] != 'undefined') ? chartStatsBar['avg3'] : 0; //우선기업 환급비
    var charStatsBarTotal = (typeof chartStatsBar['avgCnt'] != 'undefined') ? chartStatsBar['avgCnt'] : 0; //교육비 전체

    //만족도 평균(100점 만점 환산) chart setting
    var chartStatsBarData = {
        labels: ['교강사', '컨텐츠', '운영', '전체 평균'],
        datasets: [{
            label: '',
            data: [charStatsBarContent, charStatsBarProf, charStatsBarManage, charStatsBarTotal],
            backgroundColor: [COLOR_LIME_TRANSPARENT_7, COLOR_ORANGE_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_PINK_TRANSPARENT_7],
            borderColor: [COLOR_INDIGO, COLOR_INDIGO, COLOR_INDIGO, COLOR_INDIGO],
            borderWidth: 1
        }]
    };

    // 만족도 평균(100점 만점 환산) chart 생성
    myStatsBarChart.destroy();
    // 메뉴 이동 시 데이터 로딩 오류 대응
    var ctx1 = document.getElementById('chartStatsBar').getContext('2d');
    if (typeof ctx1 !== 'undefined' && ctx1 != null) {       
        myStatsBarChart = new Chart(ctx1, {
            type: 'bar',
            data: chartStatsBarData,
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return parseInt(tooltipValue).toLocaleString();
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: function (value, index, values) {
                                return value.toLocaleString(); // this is all we need
                            }
                        }
                    }]
                }
            }
        });
    }


    //만족도 랭킹(100점 만점 환산) 
    var labels_p = [];
    var data_p = [];
    for (var i = 0; i < chartRankItems.length; i++) {
        var element = chartRankItems[i];
        var label_t = element['COURSE_NAME'] + ' [ ' + element['JOINER_CNT'] + ' ] 명참여';
        labels_p.push(label_t);
        data_p.push(element['AVG_CNT']);

    }

    //만족도 랭킹(100점 만점 환산) chart setting
    var chartRankBarData = {
        labels: labels_p,
        datasets: [{
            label: '',
            data: data_p,
            backgroundColor: [COLOR_LIME_TRANSPARENT_7, COLOR_ORANGE_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_PINK_TRANSPARENT_7, COLOR_PINK_TRANSPARENT_7],
            borderColor: [COLOR_INDIGO, COLOR_INDIGO, COLOR_INDIGO, COLOR_INDIGO, COLOR_INDIGO],
            borderWidth: 1
        }]
    };
    // 만족도 랭킹(100점 만점 환산) chart 생성
    myRankBarChart.destroy();
    var ctx2 = document.getElementById('chartRankBar').getContext('2d');
    if (typeof ctx2 !== 'undefined' && ctx2 != null) {           
        myRankBarChart = new Chart(ctx2, {
            type: 'horizontalBar',
            data: chartRankBarData,
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return parseInt(tooltipValue).toLocaleString();
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        position: 'right',
                        ticks: {
                            beginAtZero: true,
                            userCallback: function (value, index, values) {
                                return value.toLocaleString(); // this is all we need
                            }
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0
                        }
                    }],

                }
            }
        });
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
        url += "&gubun=select&courseCodes=" + strs;
        url = decodeURIComponent(url);

        $.download('/study/report/getExcelCourseSurveyList', url, 'post');
    }
}

//엑셀(전체) 다운로드
function doDownloadExcelAll() {
    var url = $("#searchForm").serialize();
    url += "&gubun=all";
    url = decodeURIComponent(url);
    $.download('/study/report/getExcelCourseSurveyList', url, 'post');
}