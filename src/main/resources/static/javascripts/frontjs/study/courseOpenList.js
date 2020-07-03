var dataTable;
var myDoughnut;
var myBarChart;
var myLineChart;
var bRunning = false;

$(document).ready(function () {

    var ctx1 = document.getElementById('doughnut-chart');

    if (typeof ctx1 !== 'undefined' && ctx1 != null) {
    ctx1 = ctx1.getContext('2d');
    
        myDoughnut = new Chart(ctx1, {
            type: 'doughnut',
            data: {}
        });
    
    }

    var ctx2 = document.getElementById('bar-chart');
    if(typeof ctx2 !== 'undefined' && ctx2 != null) {
        myBarChart = new Chart(ctx2, {
            type: 'bar',
            data: {}
        });
    }

    var ctx3 = document.getElementById('line-chart');

    if(typeof ctx3 !=='undefined' && ctx3 != null) {
        myLineChart = new Chart(ctx3, {
            type: 'line',
            data: {}
        });
    }

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
            "url": "/study/status/ajaxCourseOpenList",
            "type": "POST",
            "data": function (d) {
                let date = $('#default-daterange input').val();
                let arr = date.split("-");
                d.search_date_type = $("#searchDateType").val();
                d.course_st_dtime = $("#strtDate").val();
                d.course_finish_dtime = $("#finishDate").val();
                d.office_code = $("#officeCode").val();
                d.labor_yn = $("#laborYn").val();
                d.course_kind_cd = $("#courseKindCd").val();
                d.search_keyword = $("#searchKeyword").val();
                d.bRunning = bRunning;
            },
            dataSrc: "data",
            complete: function (data) {
                if (bRunning) {
                    initChart(data.responseJSON.chartDonut, data.responseJSON.chartBar, data.responseJSON.chartLine);
                }
                $('#totalCount').text(JSON.stringify(data.responseJSON.count[0].PAGETOTALCOUNT));
                $('#selectAll').prop("checked", false);
                bRunning = true;
            }
        },
        "columns": [{
            data: 'COURSE_CODE'
        }, {
            data: ''
        }, {
            data: 'COURSE_KIND_CD'
        }, {
            data: 'COURSE_NAME'
        }, {
            data: ''
        }, {
            data: 'STUDY_TIME'
        }, {
            data: 'LABOR_REFUND_YN'
        }, {
            data: 'LEARNER_CNT'
        }, {
            data: 'COMPLETION_CNT'
        }, {
            data: 'COMPLETION_RATE'
        }, {
            data: 'PASS_STD'
        }, {
            data: 'TOTAL_AVG'
        }],
        columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '    <input type="checkbox" value="' + row.COURSE_CODE + '" id="memberJoinList_checkbox_' + meta.row + '" name="checkkey" />';
                html += '    <label for="memberJoinList_checkbox_' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        }, {
            targets: 1,
            'render': function (data, type, row, meta) {
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
            'targets': [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11],
            'className': 'text-center',
        },
        {
            'targets': [3],
            'className': 'text-body-left',
            fixedHeader: true
        }
        ]
    });

    initChart(chartDonut, chartBar, chartLine);

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

    $('#default-daterange').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: moment().subtract('months', 1).format('YYYY.MM.01'),
        endDate: moment().subtract('months', 1).format('YYYY.MM.31'),
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

    $('#dataTable').before('<div class="tableOverflowX">');
    $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

    $('#default-daterange input').val(moment().subtract('months', 1).format('YYYY.MM.01') + ' - ' + moment().subtract('months', 1).format('YYYY.MM.31'));
    $("#strtDate").val(moment().subtract('months', 1).format("YYYYMM")+'010000');
    $("#finishDate").val(moment().subtract('months', 1).format('YYYYMM') +'315959');
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

function initChart(chartDonut, chartBar, chartLine) {

    var chartDonut = JSON.parse(chartDonut.replace(/&#34;/gi, '\"'));
    var chartBar = JSON.parse(chartBar.replace(/&#34;/gi, '\"'));
    var chartLine = JSON.parse(chartLine.replace(/&#34;/gi, '\"'));

    var newChartDonutEL = filterItems(chartDonut, 'COURSE_KIND_CD', 'EL'); // 이러닝
    var newChartDonutPL = filterItems(chartDonut, 'COURSE_KIND_CD', 'PL'); // 북러닝
    var newChartDonutLL = filterItems(chartDonut, 'COURSE_KIND_CD', 'LL'); // 전화/화상

    var learnerCnt = (chartBar[0].LEARNER_CNT) ? chartBar[0].LEARNER_CNT : 0;
    var completeCnt = (chartBar[0].COMPLETION_CNT) ? chartBar[0].COMPLETION_CNT : 0;

    var chartDonutEL = (newChartDonutEL[0]) ? newChartDonutEL[0].COURSE_KIND_CNT : 0;
    var chartDonutPL = (newChartDonutPL[0]) ? newChartDonutPL[0].COURSE_KIND_CNT : 0;
    var chartDonutLL = (newChartDonutLL[0]) ? newChartDonutLL[0].COURSE_KIND_CNT : 0;

    Chart.defaults.global.defaultFontColor = COLOR_DARK;
    Chart.defaults.global.defaultFontFamily = FONT_FAMILY;
    Chart.defaults.global.defaultFontStyle = FONT_WEIGHT;

    var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
    };

    var doughnutChartData = {
        labels: ['이러닝 ' + chartDonutEL + '개', '북러닝 ' + chartDonutPL + '개', '전화/화상 ' + chartDonutLL + '개'],
        datasets: [{
            data: [chartDonutEL, chartDonutPL, chartDonutLL],
            backgroundColor: [COLOR_INDIGO_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_ORANGE_TRANSPARENT_7],
            borderColor: [COLOR_INDIGO, COLOR_BLUE, COLOR_ORANGE],
            borderWidth: 2,
            label: ['이러닝', '북러닝', '전화/화상']
        }]
    };

    var barChartData = {
        labels: ['입과 / 수료'],
        datasets: [{
            data: [learnerCnt, 0],
            backgroundColor: [COLOR_INDIGO_TRANSPARENT_7],
            borderColor: [COLOR_INDIGO],
            borderWidth: 2,
            label: ['입과 ' + learnerCnt + '명']
        }, {
            data: [completeCnt, 0],
            backgroundColor: [COLOR_BLUE_TRANSPARENT_7],
            borderColor: [COLOR_BLUE],
            borderWidth: 2,
            label: ['수료 ' + completeCnt + '명']
        }]
    };

    var courseCodes = [];
    var completionRates = [];
    var len = (chartLine.length > 10) ? 10 : chartLine.length;

    for (var i = 0; i < len; i++) {
        courseCodes.push(chartLine[i].COURSE_CODE);
        completionRates.push(chartLine[i].COMPLETION_RATE);
    }

    var lineChartData = {
        labels: courseCodes,
        datasets: [{
            label: '수료율',
            borderColor: COLOR_BLUE,
            pointBackgroundColor: COLOR_BLUE,
            pointRadius: 2,
            borderWidth: 2,
            backgroundColor: COLOR_BLUE_TRANSPARENT_3,
            data: completionRates
        }]
    };

    myDoughnut.destroy();
    var ctx1 = document.getElementById('doughnut-chart').getContext('2d');
    myDoughnut = new Chart(ctx1, {
        type: 'doughnut',
        data: doughnutChartData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    myBarChart.destroy();
    var ctx2 = document.getElementById('bar-chart').getContext('2d');
    myBarChart = new Chart(ctx2, {
        type: 'bar',
        data: barChartData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    myLineChart.destroy();
    var ctx = document.getElementById('line-chart').getContext('2d');
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: lineChartData,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

function filterItems(data, key, value) {
    return data.filter(function (item) {
        return item[key] == value;
    });
}

// 리스트 조회
function getData() {
    dataTable.ajax.reload();
}

function createExcel() {

    var courseCodes = "";

    $('input:checkbox[name=checkkey]:checked').each(function () {
        courseCodes += ((courseCodes == '') ? '' : ',') + $(this).val();
    });

    var url = $("#searchForm").serialize();
    if (courseCodes != '') {
        url += "&gubun=select&course_code=" + courseCodes;
        url = decodeURIComponent(url);

        $.download('/study/status/excelCourseOpenList', url, 'post');
    } else {
        alert("선택된 내용이 없습니다.");
        return;
    }

}

function createExcelAll() {

    var url = $("#searchForm").serialize();
    url += "&gubun=all";
    url = decodeURIComponent(url);

    $.download('/study/status/excelCourseOpenList', url, 'post');
}