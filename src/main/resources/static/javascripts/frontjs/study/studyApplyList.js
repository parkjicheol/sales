var bRunning = false;

//dataTable 생성
var dataTable = $('#dataTable').DataTable({
  dom: 'Blfrtip',
  //addTableClass: 'col-lg-12',
  lengthChange: false,
  ordering: false,
  searching: false,
  initialLoad: false,
  pageLength: 20,
  buttons: [],
  ajax: {
    "url": "/study/status/ajaxStudyApplyList",
    "type": "POST",
    "data": function (d) {
      d.fixSectionYn = $("#fixSectionYn").val();
      d.studyDateStandard = $("#studyDateStandard").val();
      d.strtDate = $("#strtDate").val();
      d.finishDate = $("#finishDate").val();
      d.cmpyOfficeCode = $("#cmpyOfficeCode").val();
      d.bRunning = bRunning;
    },
    dataSrc: "data",
    complete: function (data) {
      $('#total_count').text(JSON.stringify(data.responseJSON.recordsTotal));
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
      data: ''
    }, {
      data: 'LABOR_REFUND_YN'
    }, {
      data: 'LEARNER_CNT'
    }, {
      data: 'REAL_EDU_COST'
    }
    , {
      data: 'MAJOR_REFUND_PRICE'
    }, {
      data: 'MID_REFUND_PRICE'
    }, {
      data: 'MINOR_REFUND_PRICE'
    }, {
      data: 'COURSE_KIND_CD'
    }
  ],
  columnDefs: [{
      targets: 0,
      'render': function (data, type, full, meta) {
        var info = dataTable.page.info();
        return info.recordsTotal - (info.page * info.length + meta.row);
      }
    },
    {
      targets: 3,
      'render': function (data, type, row, meta) {
        return row.STUDY_START_DATE + '~' + row.STUDY_FINISH_DATE;
      }
    },
    {
      'targets': [0, 1, 3, 4, 5, 10],
      'className': 'dt-body-center'
    },
    {
      'targets': [2],
      'className': 'dt-body-left'
    },
    {
      'targets': [6, 7, 8, 9],
      'className': 'dt-body-right'
    }
  ]
});

$(document).ready(function () {

  // 검색버튼 클릭시
  $("#search").on("click", function (event) {
    dataTable.draw();
  });

  $('#default-daterange input').val(moment().startOf('month').format('YYYY.MM.DD') + ' - ' + moment().endOf('month').format('YYYY.MM.DD'));
  $("#strtDate").val(moment().startOf('month').format('YYYYMMDD') + '0000');
  $("#finishDate").val(moment().endOf('month').format('YYYYMMDD') + '5959');

  // 시작/종료일자 달력
  $('#default-daterange').daterangepicker({
      opens: 'right',
      format: 'YYYY.MM.DD',
      separator: ' to ',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
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
    },
    function (start, end) {
      $('#default-daterange input').val(start.format('YYYY.MM.DD') + ' - ' + end.format('YYYY.MM.DD'));
      var studyStartDate = start.format('YYYYMMDD') + '0000';
      var studyFinishDate = end.format('YYYYMMDD') + '5959';

      $("#strtDate").val(studyStartDate);
      $("#finishDate").val(studyFinishDate);
    }
  );

  $('#dataTable').before('<div class="tableOverflowX">');
  $("#dataTable").appendTo($(".tableOverflowX")); //해당테이블을 div tableOverflowX 아래로 넣는다.

  //테이블 조회갯수 지정
  $("#selectLength").on("change", function (event) {
    var oSettings = dataTable.settings()[0];
    var len = Number($("#selectLength option:selected").val());

    oSettings._iDisplayLength = len === -1 ? $("#total_count").text() : len;

    dataTable.draw();

  });

});

function doDownloadExcel(courseKindCd) {

  var url = $("#searchForm").serialize();
  url += "&courseKindCd=" + courseKindCd;
  url = decodeURIComponent(url);

  $.download('/study/status/excelStudyApplyList', url, 'post');
}