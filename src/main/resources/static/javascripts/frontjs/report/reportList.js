var bRunning = false;

$(document).ready(function () {

    // 검색버튼 클릭시
    $("#search").on("click", function (event) {
        document.location.href = '#/sales/report/' + $('#searchYear').val() + '/' + $('#searchMonth').val();
    });

});