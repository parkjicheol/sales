var bRunning = false;

$(document).ready(function () {

    // 검색버튼 클릭시
    $("#search").on("click", function (event) {
        document.location.href = '#/servlet/sales/report/' + $('#searchYear').val() + '/' + $('#searchMonth').val();
    });

    $("#print").on("click", function (event) {
        printJS('data-table-combine_wrapper', 'html');
    });

});