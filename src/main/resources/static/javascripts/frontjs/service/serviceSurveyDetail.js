$(document).ready(function () {

  // 설문 항목 번호
  for (var i = 1; i <= 5; i++) {

    switch (i) {
      case 1:
        $("#chart_" + i).text("①");
        break;
      case 2:
        $("#chart_" + i).text("②");
        break;
      case 3:
        $("#chart_" + i).text("③");
        break;
      case 4:
        $("#chart_" + i).text("④");
        break;
      case 5:
        $("#chart_" + i).text("⑤");
        break;
    }

  }

});