//dataTable 변수선언
var dataTable;
var myStatsDoughnut;
var myStatsBarChart;
var myCostDoughnut;
var myCostBarChart;
var bRunning = false;

$(document).ready(function () {
    var ctx1 = document.getElementById('chartCircleStats').getContext('2d');
    myStatsDoughnut = new Chart(ctx1, {
        type: 'doughnut',
        data: {}
    });

    var ctx2 = document.getElementById('chartBarStats').getContext('2d');
    myStatsBarChart = new Chart(ctx2, {
        type: 'bar',
        data: {}
    });

    var ctx3 = document.getElementById('chartCircleCost').getContext('2d');
    myCostDoughnut = new Chart(ctx3, {
        type: 'doughnut',
        data: {}
    });

    var ctx4 = document.getElementById('chartBarCost').getContext('2d');
    myCostBarChart = new Chart(ctx4, {
        type: 'bar',
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
            "url": "/study/report/ajaxCourseResultList",
            "type": "POST",
            "data": function (d) {
                d.searchOption = $("#searchOption").val();
                d.searchKeyword = $("#searchKeyword").val();
                d.studyDateStandard = $("#studyDateStandard").val();
                d.strtDate = $("#strtDate").val();
                d.finishDate = $("#finishDate").val();
                d.cmpyOfficeCode = $("#cmpyOfficeCode").val();
                d.laborYn = $("#laborYn").val();
                d.courseTypeCd = $("#courseTypeCd").val();
                d.completionStatusCd = $("#completionStatusCd").val();
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {
                if (bRunning) {
                    initChart(data.responseJSON.chartCircleStats, data.responseJSON.chartBarStats, data.responseJSON.chartCircleCost, data.responseJSON.chartBarCost);
                }                                
                $('#totalCount').text(JSON.stringify(data.responseJSON.count[0].PAGETOTALCOUNT));

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
            data: 'MEMBER_NAME'
        }, {
            data: 'LOGIN_ID'
        }, {
            data: 'COURSE_NAME'
        }, {
            data: 'STUDY_START_DATE'
        }, {
            data: 'LABOR_REFUND_YN'
        }, {
            data: 'PROGRESS_POINT'
        }, {
            data: 'EXAM_CHANGE_POINT'
        }, {
            data: 'TASK_CHANGE_POINT'
        }, {
            data: 'PROG_EXAM_CHANGE_POINT'
        }, {
            data: 'TOTAL_POINT'
        }, {
            data: 'COMPLETION_STATUS'
        }],
        columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.MEMBER_SEQ + '" id="memberJoinList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="memberJoinList_checkbox_' + meta.row + '">&nbsp;</label>';
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
            targets: 6,
            'render': function (data, type, row, meta) {
                return row.STUDY_START_DATE + '~' + row.STUDY_FINISH_DATE;
            }
        }, {
            targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            'className': 'text-center'
        }],
    });

    initChart(chartCircleStats, chartBarStats, chartCircleCost, chartBarCost);

    //$('#dataTable_length').append('<p class="mb-0" style="line-height:34px">총<span id="total_count"></span>건</p>');
    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    // initChart('<%= chartCircleStats%>', '<%= chartBarStats%>', '<%= chartCircleCost%>', '<%= chartBarCost%>');
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

});

function initChart(chartStatsDonut, chartStatsBar, chartCostDonut, chartCostBar) {

    //입과자 수료율 donut 그래프
    var chartStatsDonut = JSON.parse(chartStatsDonut.replace(/&#34;/gi, '\"'));
    //입과자 총점 분포 bar 그래프
    var chartStatsBar = JSON.parse(chartStatsBar.replace(/&#34;/gi, '\"'));
    //교육비 지출현황 donut 그래프
    var chartCostDonut = JSON.parse(chartCostDonut.replace(/&#34;/gi, '\"'));
    //교육비/환급비 bar 그래프
    var chartCostBar = JSON.parse(chartCostBar.replace(/&#34;/gi, '\"'));

    //console.log('chartStatsDonut', chartStatsDonut);
    //console.log('chartStatsBar', chartStatsBar);
    //console.log('chartCostDonut', chartCostDonut);
    //console.log('chartCostBar', chartCostBar);

    //chart default option setting
    Chart.defaults.global.defaultFontColor = COLOR_DARK;
    Chart.defaults.global.defaultFontFamily = FONT_FAMILY;
    Chart.defaults.global.defaultFontStyle = FONT_WEIGHT;
    Chart.defaults.global.defaultFontSize = 9;

    // 입과자 수료율
    // chart 데이터
    var newchartStatsDonutCP = filterItems(chartStatsDonut, 'COMPLETION_YN', '수료'); // 수료
    var newchartStatsDonutNCP = filterItems(chartStatsDonut, 'COMPLETION_YN', '미수료'); // 미수료
    var newchartStatsDonutST = filterItems(chartStatsDonut, 'COMPLETION_YN', '학습중'); // 학습중

    var chartDonutCP = (typeof newchartStatsDonutCP[0] != 'undefined') ? newchartStatsDonutCP[0].COMPLETION_CNT : 0; //이러닝 교육비
    var chartDonutNCP = (typeof newchartStatsDonutNCP[0] != 'undefined') ? newchartStatsDonutNCP[0].COMPLETION_CNT : 0; //북러닝 교육비
    var chartDonutST = (typeof newchartStatsDonutST[0] != 'undefined') ? newchartStatsDonutST[0].COMPLETION_CNT : 0; //링크 교육비

    //입과자 수료율 chart setting
    var chartStatsDoughnutData = {
        labels: ['수료 ' + chartDonutCP.toLocaleString() + '명', '미수료 ' + chartDonutNCP.toLocaleString() + '명', '학습중' + chartDonutST.toLocaleString() + '명'],
        datasets: [{
            data: [chartDonutCP, chartDonutNCP, chartDonutST],
            backgroundColor: [COLOR_INDIGO_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_ORANGE_TRANSPARENT_7],
            borderColor: [COLOR_INDIGO, COLOR_BLUE, COLOR_ORANGE],
            borderWidth: 2,
            label: ['수료', '미수료', '학습중']
        }]
    };

    // 입과자 총점 분포
    // chart 데이터
    var chartStatsBarDatas = [];
    // chart labels : title
    var chartStatsBarLabels = [];
    // chart backgroundColors
    var chartStatsBarbackgroundColors = [];
    // chart borderColors
    var chartStatsBarborderColors = [];

    var sequenceMap = {
        "5": ["0~20점", COLOR_LIME_TRANSPARENT_7],
        "4": ["20~40점", COLOR_ORANGE_TRANSPARENT_7],
        "3": ["40~60점", COLOR_TEAL_TRANSPARENT_7],
        "2": ["60~80점", COLOR_PINK_TRANSPARENT_7],
        "1": ["80~100점", COLOR_BLUE_TRANSPARENT_7]
    };

    for (let index = 0; index < chartStatsBar.length; index++) {
        var element = chartStatsBar[index];

        var titleNcolor = sequenceMap[element.SEQUENCE];

        var value = element.TOTAL_POINTS;
        var title = titleNcolor[0];
        var backgroundColor = titleNcolor[1];
        var borderColor = COLOR_INDIGO;

        console.log('titleNcolor >> ' + titleNcolor);

        chartStatsBarDatas.push(value);
        chartStatsBarbackgroundColors.push(backgroundColor)
        chartStatsBarborderColors.push(borderColor);
        chartStatsBarLabels.push(title);
    }

    //입과자 총점 분포 chart setting
    var chartStatsBarData = {
        labels: chartStatsBarLabels,
        datasets: [{
            label: '입과자 총점 분포(명)',
            data: chartStatsBarDatas,
            backgroundColor: chartStatsBarbackgroundColors,
            borderColor: chartStatsBarborderColors,
            borderWidth: 1
        }]
    };

    // 교육비 지출현황
    var newChartDonutEL = filterItems(chartCostDonut, 'COURSE_KIND_CD', 'EL'); // 이러닝
    var newChartDonutPL = filterItems(chartCostDonut, 'COURSE_KIND_CD', 'PL'); // 북러닝
    var newChartDonutLL = filterItems(chartCostDonut, 'COURSE_KIND_CD', 'LL'); // 전화/화상

    function filterItems(data, key, value) {
        return data.filter(function (item) {
            return item[key] == value;
        });
    }

    var chartDonutEL = (typeof newChartDonutEL[0] != 'undefined') ? newChartDonutEL[0].REAL_EDU_COST_SUM : 0; //이러닝 교육비
    var chartDonutPL = (typeof newChartDonutPL[0] != 'undefined') ? newChartDonutPL[0].REAL_EDU_COST_SUM : 0; //북러닝 교육비
    var chartDonutLL = (typeof newChartDonutLL[0] != 'undefined') ? newChartDonutLL[0].REAL_EDU_COST_SUM : 0; //링크 교육비

    //교육비 지출현황 chart setting
    var chartCostDonutData = {
        labels: ['이러닝 ' + chartDonutEL.toLocaleString() + '원', '북러닝 ' + chartDonutPL.toLocaleString() + '원', '전화/화상 ' + chartDonutLL.toLocaleString() + '원'],
        datasets: [{
            data: [chartDonutEL, chartDonutPL, chartDonutLL],
            backgroundColor: [COLOR_INDIGO_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_ORANGE_TRANSPARENT_7],
            borderColor: [COLOR_INDIGO, COLOR_BLUE, COLOR_ORANGE],
            borderWidth: 2,
            label: ['이러닝', '북러닝', '전화/화상']
        }]
    };

    //교육비 / 환급비(원)
    var charBarMajor = (typeof chartCostBar[0]['MAJOR_REFUND_PRICE'] != 'undefined') ? chartCostBar[0]['MAJOR_REFUND_PRICE'] : 0; //대기업 환급비
    var charBarMid = (typeof chartCostBar[0]['MID_REFUND_PRICE'] != 'undefined') ? chartCostBar[0]['MID_REFUND_PRICE'] : 0; //중견기업 환급비
    var charBarMinor = (typeof chartCostBar[0]['MINOR_REFUND_PRICE'] != 'undefined') ? chartCostBar[0]['MINOR_REFUND_PRICE'] : 0; //우선기업 환급비
    var charBarReal = (typeof chartCostBar[0]['REAL_EDU_COST'] != 'undefined') ? chartCostBar[0]['REAL_EDU_COST'] : 0; //교육비 전체

    //교육비 / 환급비 chart setting
    var chartCostBarData = {
        labels: ['교육비 전체', '대기업 환급비', '중견기업 환급비', '우선기업 환급비'],
        datasets: [{
            label: '',
            data: [charBarReal, charBarMajor, charBarMid, charBarMinor],
            backgroundColor: [COLOR_LIME_TRANSPARENT_7, COLOR_ORANGE_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_PINK_TRANSPARENT_7],
            borderColor: [COLOR_INDIGO, COLOR_INDIGO, COLOR_INDIGO, COLOR_INDIGO],
            borderWidth: 1
        }]
    };

    // 입과자 수료율 chart 생성
    myStatsDoughnut.destroy();
    var ctx1 = document.getElementById('chartCircleStats').getContext('2d');
    
    if (typeof ctx1 !== 'undefined' && ctx1 != null) {           
        myStatsDoughnut = new Chart(ctx1, {
            type: 'doughnut',
            data: chartStatsDoughnutData,
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
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
                }
            }
        });
    }

    // 입과자 총점 분포 chart 생성
    myStatsBarChart.destroy();
    var ctx2 = document.getElementById('chartBarStats').getContext('2d');

    if (typeof ctx2 !== 'undefined' && ctx2 != null) {           
        myStatsBarChart = new Chart(ctx2, {
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

    // 교육비 지출현황 chart 생성
    myCostDoughnut.destroy();
    var ctx3 = document.getElementById('chartCircleCost').getContext('2d');

    if (typeof ctx3 !== 'undefined' && ctx3 != null) {           
        myCostDoughnut = new Chart(ctx3, {
            type: 'doughnut',
            data: chartCostDonutData,
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
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
                }
            }
        });
    }

    // 교육비 / 환급비 chart 생성
    myCostBarChart.destroy();
    var ctx4 = document.getElementById('chartBarCost').getContext('2d');

    if (typeof ctx4 !== 'undefined' && ctx4 != null) {           
        
        myCostBarChart = new Chart(ctx4, {
            type: 'bar',
            data: chartCostBarData,
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

}

// check box seq값 생성
function getCheckSeqs() {

    var values = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        values += ((values == '') ? '' : ',') + $(this).val();
    });

    return values;

}

// 리스트 조회
function getData() {
    dataTable.ajax.reload();
}

//엑셀 다운로드
function doDownloadExcel() {
    var strs = getCheckSeqs();

    if (strs == "") {
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
        url += "&gubun=select&memberSeqs=" + strs;
        url = decodeURIComponent(url);

        $.download('/study/report/getExcelCourseResultList', url, 'post');
    }
}

//엑셀(전체) 다운로드
function doDownloadExcelAll() {
    var url = $("#searchForm").serialize();
    url += "&gubun=all";
    url = decodeURIComponent(url);
    $.download('/study/report/getExcelCourseResultList', url, 'post');
}
