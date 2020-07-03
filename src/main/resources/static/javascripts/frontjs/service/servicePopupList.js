var bRunning = false;

//dataTable 생성
var dataTable = $('#dataTable').DataTable({
    dom: 'Blfrtip',
    //addTableClass: 'col-lg-12',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 10,
    buttons: [],
    ajax: {
        "url": "/service/ajaxServicePopupList",
        "type": "POST",
        "data": function (d) {
            d.channelSeq = $("#channelSeq").val();
            d.searchField = $("#searchField").val();
            d.searchKw = $("#searchInput").val();
            d.bRunning = bRunning;
        },
        dataSrc: "data",
        complete: function (data) {
            $('#totalCount').text(JSON.stringify(data.responseJSON.recordsTotal));
            bRunning = true;
        }
    },
    columns: [{
        data: 'POPUP_SEQ'
    }, {
        data: null
    }, {
        data: 'POPUP_TITLE'
    }, {
        data: 'POST_YN'
    }, {
        data: 'REG_MEMBER_NAME'
    }, {
        data: 'REG_DTIME',
        type: 'date'
    }],
    columnDefs: [{
        targets: 0,
        className: 'with-checkbox text-center',
        'render': function (data, type, row, meta) {
            var html = '<div class="checkbox checkbox-css">';
            html += '    <input type="checkbox" value="' + row.POPUP_SEQ + '" id="popupList_checkbox_' + meta.row + '" name="checkkey" />';
            html += '    <label for="popupList_checkbox_' + meta.row + '">&nbsp;</label>';
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
        targets: 2,
        className: 'dt-body-left',
        selector: 'td',
        render: function (data, type, row, meta) {
            return '<a href="#/service/popupEdit?popupSeq=' + row.POPUP_SEQ + '">' + row.POPUP_TITLE + '</a>';
        }
    }, {
        targets: 5,
        className: 'text-center',
        render: function (data, type, row, meta) {
            return moment(row.REG_DTIME).format('YYYY.MM.DD');
        }
    }, {
        targets: [0, 1, 2, 3, 4, 5],
        className: 'text-center'
    }]
});

//리스트 조회
function getData() {
    dataTable.draw();
}

$(document).ready(function () {

    App.setPageTitle('Color Admin | General UI Elements');
    App.restartGlobalFunction();

    $
        .when(
            $
            .getScript('../javascripts/plugins/highlight.js/highlight.min.js'),
            $.Deferred(function (deferred) {
                $(deferred.resolve);
            }))
        .done(
            function () {
                $
                    .getScript('../javascripts/plugins/js/render.highlight.js'),
                    $.Deferred(function (
                        deferred) {
                        $(deferred.resolve);
                    })
            });

    //input X버튼
    var $ipt = $('#searchInput'),
        $clearIpt = $('#searchClear');
    $ipt.keyup(function () {
        $("#searchClear").toggle(Boolean($(this).val()));
    });

    $clearIpt.toggle(Boolean($ipt.val()));
    $clearIpt.click(function () {
        $("#searchInput").val('').focus();
        $(this).hide();
    });

    //페이지 당 조회 건수 지정
    $("#selectLength").on("change", function (event) {
        var oSettings = dataTable.settings()[0];
        var len = Number($("#selectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#totalCount").text() : len;
        getData();

    });

    //검색버튼 클릭시
    $("#search").on("click", function (event) {
        getData();
    });

    $('#searchInput').keypress(function (key) {
        if (key.keyCode == 13) { //키가 13이면 실행 (엔터는 13)
            getData();
        }
    });
    //전체 checkbox
    $("#selectAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[type=checkbox]").prop("checked", true);
        } else {
            $("input[type=checkbox]").prop("checked", false);
        }
    });

    //삭제 버튼 클릭 시
    $('[data-click="swal-danger"]').click(function (e) {
        e.preventDefault();

        if ($('#totalCount').text() === '0') {
            return false;
        }
        
        if ($('input:checkbox[name=checkkey]:checked').length < 1) {
            swal({
                title: '선택된 팝업이 없습니다.',
                text: '삭제할 팝업을 선택해주세요.',
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
        }

        swal({
            title: '삭제하시겠습니까?',
            // text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: '취소',
                    value: null,
                    visible: true,
                    className: 'btn btn-default',
                    closeModal: true,
                },
                confirm: {
                    text: '확인',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        }).then(function (isConfirm) {
            if (isConfirm) {
                $.ajax({
                    type: "POST",
                    url: "/service/removeServicePopup",
                    data: $('form[name=deleteForm]').serialize(),
                    dataType: "json",
                    success: function (data) {
                        console.debug(data);
                        if(Number(data.successCount) > 0) {
                            swal({
                                title: '팝업 삭제에 성공하였습니다.',
                                // text: 'You will not be able to recover this imaginary file!',
                                icon: 'success',
                                buttons: {
                                    confirm: {
                                        text: '확인',
                                        value: true,
                                        visible: true,
                                        className: 'btn btn-primary',
                                        closeModal: true
                                    }
                                }
                            }).then(function (isConfirm) {
                                window.location.reload();
                            });

                        }else{
                            swal({title: '팝업 삭제에 실패했습니다.',
                                // text: 'You will not be able to recover this imaginary file!',
                                icon: 'error',
                                buttons: {
                                    confirm: {
                                        text: '확인',
                                        value: true,
                                        visible: true,
                                        className: 'btn btn-primary',
                                        closeModal: true
                                    }
                                }
                            });

                        }

                    },
                    error: function (request,status,error) {
                        swal({
                            title: '팝업 삭제에 실패했습니다.',
                            // text: 'You will not be able to recover this imaginary file!',
                            icon: 'error',
                            buttons: {
                                confirm: {
                                    text: '확인',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-primary',
                                    closeModal: true
                                }
                            }
                        });
                    }
                });
            }
        });
    });

});