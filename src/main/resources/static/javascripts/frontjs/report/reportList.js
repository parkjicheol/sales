var bRunning = false;

$(document).ready(function () {

    // 검색버튼 클릭시
    $("#search").on("click", function (event) {
        document.location.href = '#/report/list/' + $('#searchYear').val() + '/' + $('#searchMonth').val();
    });

});