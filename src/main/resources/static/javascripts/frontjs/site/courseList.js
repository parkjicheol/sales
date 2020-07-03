$(document).ready(function () {

    if (!isEmpty($("#position").val())) {
        $(document).scrollTop($(document).height() + 500);
    }

    requiredDataTable.settings()[0].oLanguage.sEmptyTable = '등록된 과정이 없습니다.';
    recommendDataTable.settings()[0].oLanguage.sEmptyTable = '등록된 과정이 없습니다.';

    $("input:radio[name=sortRuleCd06]:input[value='" + $("#sortRuleCd06").val() + "']").prop("checked", true);
    $("input:radio[name=sortRuleCd03]:input[value='" + $("#sortRuleCd03").val() + "']").prop("checked", true);
    doCheckSortRule('06');
    doCheckSortRule('03');

    $('.changeOrder tbody tr').on('click', function () {
        $('.changeOrder tbody tr').removeClass('selected');
        $(this).addClass('selected');
    });

    function moveUp() {
        var $tr = $('.changeOrder tbody tr.selected'); // 클릭한 버튼이 속한 tr 요소
        $tr.prev().before($tr); // 현재 tr 의 이전 tr 앞에 선택한 tr 넣기
    }

    function moveDown() {
        var $tr = $('.changeOrder tbody tr.selected'); // 클릭한 버튼이 속한 tr 요소
        $tr.next().after($tr); // 현재 tr 의 다음 tr 뒤에 선택한 tr 넣기
    }

    //테이블 메뉴 순서변경   
    $('#btnUp').on('click', function () {
        moveUp();
    });
    $('#btnDown').on('click', function () {
        moveDown();
    });

    //필수추천과정 nav클릭시 active		
    $('.sortType ul li a').on('click', function () {
        $('.sortType ul li a').removeClass('active');
        $(this).addClass('active');
    });

    // 필수추천과정 정렬 변경시
    $(".courseSortRule").change(function () {
        var sortRuleCd = $(this);
        var courseMainKindCd = sortRuleCd.attr("courseMainKindCd");
        var checkedSortRuleCd = $("#sortRuleCd" + courseMainKindCd).val();
        var courseSettingSeq = $("#courseSettingSeq" + courseMainKindCd).val();

        $.ajax({
            type: "POST",
            url: "/site/main/modifyCourseSettings",
            data: "courseSettingSeq=" + courseSettingSeq + "&sortRuleCd=" + sortRuleCd.val(),
            success: function (data) {
                if (Number(data.successCount) < 1) {
                    swal({
                        title: '저장에 실패했습니다.',
                        text: '',
                        icon: 'error',
                        buttons: {
                            confirm: {
                                text: '확인',
                                value: true,
                                visible: true,
                                className: 'btn btn-danger',
                                closeModal: true
                            }
                        }
                    });
                    // 실패시 기존 라디오 체크
                    $("input:radio[name=" + sortRuleCd.attr("name") + "]:input[value='" + checkedSortRuleCd + "']").prop("checked", true);
                    return false;
                }
                doCheckSortRule(courseMainKindCd);
            },
            error: function (data) {
                swal({
                    title: '저장에 실패했습니다.',
                    text: '',
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: '확인',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
                // 실패시 기존 라디오 체크
                $("input:radio[name=" + sortRuleCd.attr("name") + "]:input[value='" + checkedSortRuleCd + "']").prop("checked", true);
            }
        });
    });

    //전체선택시
    $("#requiredCheckAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[name=requiredCheckbox]").prop("checked", true);
        } else {
            $("input[name=requiredCheckbox]").prop("checked", false);
        }
    });
    $("#recommendCheckAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[name=recommendCheckbox]").prop("checked", true);
        } else {
            $("input[name=recommendCheckbox]").prop("checked", false);
        }
    });
    $("#search01CheckAll").on("click", function (e) {
        if ($(this).is(":checked")) {
            $("input[name=search01Checkbox]").prop("checked", true);
        } else {
            $("input[name=search01Checkbox]").prop("checked", false);
        }
    });

    $("#recommendSelectLength").on("change", function (event) {

        var oSettings = recommendDataTable.settings()[0];
        var len = Number($("#recommendSelectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#recommendTableCount").val() : len;

        recommendDataTable.draw();
    });

    $("#requiredSelectLength").on("change", function (event) {

        var oSettings = requiredDataTable.settings()[0];
        var len = Number($("#requiredSelectLength option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#requiredTableCount").val() : len;

        requiredDataTable.draw();
    });

    $("#SearchCourse01Length").on("change", function (event) {

        var oSettings = SearchCourse01Datatable.settings()[0];
        var len = Number($("#SearchCourse01Length option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#search01TotalCount").text() : len;

        SearchCourse01Datatable.draw();
    });

    $("#SearchCourse02Length").on("change", function (event) {

        var oSettings = SearchCourse02Datatable.settings()[0];
        var len = Number($("#SearchCourse02Length option:selected").val());

        oSettings._iDisplayLength = len === -1 ? $("#search02TotalCount").text() : len;

        SearchCourse02Datatable.draw();
    });

    //캘린더
    $('#default-daterange1').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: $("#openStartDtime1").val() || moment(),
        endDate: $("#openFinishDtime1").val() || moment().add('months', 1),
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
    }, function (start, end) {

        modifyPromotionCourse({
            lineup: 1,
            openStartDtime: start.format('YYYYMMDDHH') + '0000',
            openFinishDtime: end.format('YYYYMMDDHH') + '5959',
            swalMessage: '노출기간이 변경되었습니다.'
        });

        $('#default-daterange1 input').val(start.format('YYYY.MM.DD') + ' - ' + end.format('YYYY.MM.DD'));

    });

    $('#default-daterange2').daterangepicker({
        opens: 'right',
        format: 'YYYY/MM/DD',
        separator: ' to ',
        startDate: $("#openStartDtime2").val() || moment(),
        endDate: $("#openFinishDtime2").val() || moment().add('months', 1),
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
    }, function (start, end) {
        modifyPromotionCourse({
            lineup: 2,
            openStartDtime: start.format('YYYYMMDDHH') + '0000',
            openFinishDtime: end.format('YYYYMMDDHH') + '5959',
            swalMessage: '노출기간이 변경되었습니다.'
        });

        $('#default-daterange2 input').val(start.format('YYYY.MM.DD') + ' - ' + end.format('YYYY.MM.DD'));
    });

    //홍보과정등록 노출여부 셀렉트변경
    $('select[name=isVisible]').on('change', function (e) {

        modifyPromotionCourse({
            lineup: $(this).attr("lineup"),
            openYn: $(this).val(),
            swalMessage: '노출여부가 \'' + $(this).val() + '\' 로 변경되었습니다.'
        });

    });

    // 검색버튼 클릭시
    $("#SearchCourse01Btn").on("click", function (event) {
        SearchCourse01Datatable.draw();
    });
    $("#SearchCourse02Btn").on("click", function (event) {
        SearchCourse02Datatable.draw();
    });
    
    checkLineup();
});

function checkLineup(){
    $('input[type=number]').on("propertychange change keyup paste input", function () {

        var val = isEmpty($(this).val()) ? undefined : Number($(this).val());
        var min = isEmpty($(this).attr("min")) ? undefined : Number($(this).attr("min"));
        var max = isEmpty($(this).attr("max")) ? undefined : Number($(this).attr("max"));
        
        if(!isEmpty(min) && min > val) {
            $(this).val(min);
        }
        
        if(!isEmpty(max) && max < val) {
            $(this).val(max);
        }
        
    });
}

function setCourseSearchKind(courseMainKindCd) {
    $("#courseSearchKindCd").val(courseMainKindCd);
}

function setPromotionRownum(promotionRownum) {
    $("#promotionRownum").val(promotionRownum);
}


function modifyPromotionCourse(params) {

    var data = "courseMainSeq=" + $("#courseMainSeq" + params.lineup).val();

    Object.keys(params).forEach((element, index, array) => {
        data += "&" + element + "=" + params[element];
    })

    $.ajax({
        type: "POST",
        url: "/site/main/modifyCourseList",
        data: data,
        success: function (data) {

            if (Number(data.successCount) < 1) {
                swal({
                    title: '저장에 실패했습니다.',
                    text: '',
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: '확인',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
                return false;
            }

            swal({
                title: params.swalMessage,
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
            })
        },
        error: function (data) {
            swal({
                title: '저장에 실패했습니다.',
                text: '',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: '확인',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
            return false;
        }
    });
}

function setCompanyCourseList() {

    if ($("#courseSearchKindCd").attr("running") === 'true') {
        swal({
            title: '과정을 추가중입니다. 잠시만 기다려주세요.',
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

    var maxRownum = Number($("#search01TotalCount").text());

    if (maxRownum < 1) {
        return false;
    }

    var courseCodeList = [];

    $('input:checkbox[name=search01Checkbox]:checked').each(function () {
        courseCodeList.push($(this).val())
    });

    if (courseCodeList.length < 1) {
        swal({
            title: '선택된 과정이 없습니다.',
            text: '추가할 과정을 선택해주세요.',
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

    $("#courseSearchKindCd").attr("running","true");

    $.ajax({
        type: "POST",
        url: "/site/main/setCourseList",
        data: "courseCodeList=" + courseCodeList + "&courseMainKindCd=" + $("#courseSearchKindCd").val(),
        success: function (data) {

            if (Number(data.successCount) < 1) {
                swal({
                    title: '과정추가에 실패했습니다.',
                    text: '',
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: '확인',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
                return false;
            }

            $("#courseSearchKindCd").attr("running","false");

            swal({
                title: '저장되었습니다.',
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
                if (isConfirm) {
                    requiredDataTable.draw();
                    recommendDataTable.draw();
                    $("#modal-SearchCourse01").modal("hide");
                }
            });
        },
        error: function (data) {
            swal({
                title: '과정추가에 실패했습니다.',
                text: '',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: '확인',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
            return false;
        }
    });

}

function setPromotionCourse(courseCode) {
    var courseCodeList = [];

    courseCodeList.push(courseCode);


    if (courseCodeList.length < 1) {
        swal({
            title: '선택된 과정이 없습니다.',
            text: '추가할 과정을 선택해주세요.',
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

    $.ajax({
        type: "POST",
        url: "/site/main/setCourseList",
        data: "courseCodeList=" + courseCodeList + "&courseMainKindCd=07" + "&lineup=" + $("#promotionRownum").val(),
        success: function (data) {

            if (Number(data.successCount) < 1) {
                swal({
                    title: '과정추가에 실패했습니다.',
                    text: '',
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: '확인',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
                return false;
            }

            swal({
                title: '저장되었습니다.',
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
                if (isConfirm) {
                    $("#modal-SearchCourse02").modal("hide");
                    if (isEmpty($("#position").val())) {
                        window.location.href = "#/site/main/courseList?position=bottom";
                    } else {
                        window.location.reload(true);        
                    }
                }
            });
        },
        error: function (data) {
            swal({
                title: '과정추가에 실패했습니다.',
                text: '',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: '확인',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
            return false;
        }
    });

}


function removeCourseList(courseMainKindName) {

    var courseMainSeqs = [];

    $('input:checkbox[name=' + courseMainKindName + 'Checkbox]:checked').each(function () {
        courseMainSeqs.push($(this).val())
    });

    if (courseMainSeqs.length < 1) {
        return false;
    }

    swal({
        title: '삭제 하시겠습니까?',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'error',
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
                className: 'btn btn-danger',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {
        if (isConfirm) {
            $.ajax({
                type: "POST",
                url: "/site/main/removeCourseList",
                data: "courseMainSeqs=" + courseMainSeqs,
                success: function (data) {

                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '과정삭제에 실패했습니다.',
                            text: '',
                            icon: 'error',
                            buttons: {
                                confirm: {
                                    text: '확인',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-danger',
                                    closeModal: true
                                }
                            }
                        });
                        return false;
                    }

                    swal({
                        title: '삭제되었습니다.',
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
                        if (isConfirm) {
                            requiredDataTable.draw();
                            recommendDataTable.draw();
                        }
                    });
                },
                error: function (data) {
                    swal({
                        title: '과정삭제에 실패했습니다.',
                        text: '',
                        icon: 'error',
                        buttons: {
                            confirm: {
                                text: '확인',
                                value: true,
                                visible: true,
                                className: 'btn btn-danger',
                                closeModal: true
                            }
                        }
                    });
                    return false;
                }
            });
        }
    })

}


function removePromotionCourse(courseMainSeq) {

    swal({
        title: '삭제 하시겠습니까?',
        // text: 'You will not be able to recover this imaginary file!',
        icon: 'error',
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
                className: 'btn btn-danger',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {
        if (isConfirm) {

            var courseMainSeqs = [];

            courseMainSeqs.push(courseMainSeq)

            $.ajax({
                type: "POST",
                url: "/site/main/removeCourseList",
                data: "courseMainSeqs=" + courseMainSeqs,
                success: function (data) {

                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '과정삭제에 실패했습니다.',
                            text: '',
                            icon: 'error',
                            buttons: {
                                confirm: {
                                    text: '확인',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-danger',
                                    closeModal: true
                                }
                            }
                        });
                        return false;
                    }

                    swal({
                        title: '삭제되었습니다.',
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
                        if (isConfirm) {
                            $("#modal-SearchCourse02").modal("hide");
                            if (isEmpty($("#position").val())) {
                                window.location.href = "#/site/main/courseList?position=bottom";
                            } else {
                                window.location.reload(true);        
                            }
                        }
                    });
                },
                error: function (data) {
                    swal({
                        title: '과정삭제에 실패했습니다.',
                        text: '',
                        icon: 'error',
                        buttons: {
                            confirm: {
                                text: '확인',
                                value: true,
                                visible: true,
                                className: 'btn btn-danger',
                                closeModal: true
                            }
                        }
                    });
                    return false;
                }
            });
        }
    })



}

function modifyMainKeywordLineup(courseMainKindName, courseMainKindCd) {

    var sortRuleCd = $("input:radio[name=sortRuleCd" + courseMainKindCd + "]:checked").val();
    var maxRownum = Number($("#" + courseMainKindName + "TableCount").val());

    if (sortRuleCd === '01' || maxRownum < 1) {
        return false;
    }

    var courseMainSeqList = [];
    var lineupList = [];

    for (var i = 0; i < maxRownum; i++) {
        courseMainSeqList.push($("#" + courseMainKindName + "Checkbox" + i).val());

        var lineupVal = $("#" + courseMainKindName + "Lineup" + i).val() || $("#" + courseMainKindName + "Lineup" + i).attr('placeholder');
        lineupList.push(lineupVal);
    }

    var params = "courseMainSeqList=" + courseMainSeqList + "&lineupList=" + lineupList

    $.ajax({
        type: "POST",
        url: "/site/main/modifyCourseListLineup",
        data: params,
        success: function (data) {

            if (Number(data.successCount) < 1) {
                swal({
                    title: '순서 저장에 실패했습니다.',
                    text: '',
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: '확인',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
                return false;
            }

            swal({
                title: '저장되었습니다.',
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
                if (isConfirm) {
                    requiredDataTable.draw();
                    recommendDataTable.draw();
                }
            });
        },
        error: function (data) {
            swal({
                title: '순서 저장에 실패했습니다.',
                text: '',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: '확인',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
            return false;
        }
    });
}

function doSearchDataTable(courseMainKindCd, courseKindCd) {

    $("#courseKindCd").val(courseKindCd);

    var datatable;

    if (courseMainKindCd === '06') {
        datatable = requiredDataTable;
    } else if (courseMainKindCd === '03') {
        datatable = recommendDataTable;
    }

    var oSettings = datatable.settings()[0];
    var len = Number($("#requiredSelectLength option:selected").val());

    oSettings._iDisplayLength = len === -1 ? $("#requiredTableCount").val() : len;

    datatable.draw();
}

function doCheckSortRule(courseMainKindCd) {

    var sortRuleCd = $("input:radio[name=sortRuleCd" + courseMainKindCd + "]:checked").val();

    if (sortRuleCd === '01') {
        $(".lineup" + courseMainKindCd).attr("disabled", true);
    } else if (sortRuleCd === '02') {
        $(".lineup" + courseMainKindCd).attr("disabled", false);
    }

}

function modifyCourseSettings() {
    swal({
        title: '저장 하시겠습니까?',
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
                text: '저장',
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
                url: "/site/main/modifyCourseSettings",
                data: $("#settingsForm").serialize(),
                success: function (data) {
                    if (Number(data.successCount) < 1) {
                        swal({
                            title: '저장에 실패했습니다.',
                            text: '',
                            icon: 'error',
                            buttons: {
                                confirm: {
                                    text: '확인',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-danger',
                                    closeModal: true
                                }
                            }
                        });
                        return false;
                    }
                    swal({
                        title: '저장되었습니다.',
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
                    })
                },
                error: function (data) {
                    swal({
                        title: '저장에 실패했습니다.',
                        text: '',
                        icon: 'error',
                        buttons: {
                            confirm: {
                                text: '확인',
                                value: true,
                                visible: true,
                                className: 'btn btn-danger',
                                closeModal: true
                            }
                        }
                    });
                }
            });
        }
    })
}

function setCount(params) {

    var totalCount = isEmpty(params.TotalCount) ? 0 : params.TotalCount;

    $("#totalCount" + params.courseMainKindCd).text("(" + totalCount + ")")

    Object.keys(params).forEach((element, index, array) => {

        var count = params[element] || 0;

        $("#" + params.courseMainKindName + element).text(count);

    })

}

var bRunningRecommend = false;
var bRunningRequired = false;
var bRunningSearch01 = false;
var bRunningSearch02 = false;

//recommendDataTable 생성
var recommendDataTable = $('#recommendDataTable').DataTable({
    dom: 'Blfrtip',
    addTableClass: 'col-lg-12 px-0',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/site/main/ajaxCourseList",
        "type": "POST",
        "data": function (d) {
            d.courseMainKindName = "recommend";
            d.courseMainKindCd = "03"
            d.courseKindCd = $("#courseKindCd").val();
            d.bRunning = bRunningRecommend;
        },
        dataSrc: "data",
        complete: function (data) {
            $('#recommendCheckAll').prop("checked", false);
            $("#recommendTableCount").val(data.responseJSON.recordsTotal);
            if (bRunningRecommend) {
                setCount({
                    courseMainKindName: "recommend",
                    courseMainKindCd: "03",
                    TotalCount: data.responseJSON.records.recommendTOTAL,
                    ELCount: data.responseJSON.records.recommendEL,
                    PLCount: data.responseJSON.records.recommendPL,
                    OLCount: data.responseJSON.records.recommendOL,
                    LLCount: data.responseJSON.records.recommendLL,
                    BLCount: data.responseJSON.records.recommendBL,
                })
            }
            doCheckSortRule('03');
            checkLineup();
            bRunningRecommend = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: ''
    }, {
        data: 'COURSE_KIND_NM'
    }, {
        data: 'COURSE_NAME'
    }, {
        data: 'LABOR_REFUND_YN'
    }, {
        data: 'REG_DTIME'
    }, {
        data: ''
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '<input type="checkbox" value="' + row.COURSE_MAIN_SEQ + '" id="recommendCheckbox' + meta.row + '" name="recommendCheckbox" />';
                html += '<label for="recommendCheckbox' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        },
        {
            targets: 1,
            'render': function (data, type, row, meta) {
                var info = recommendDataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            targets: 6,
            'render': function (data, type, row, meta) {
                // var linup = row.LINEUP || '';
                return '<input id="recommendLineup' + meta.row + '" class="text-center lineup03" type="number" min="1" max="' + recommendDataTable.ajax.json().records.recommendTOTAL + '" placeholder="' + row.LINEUP + '">';
            }
        },
        {
            'targets': [0, 1, 2, 4, 5, 6],
            'className': 'dt-body-center'
        }
    ]
});

//requiredDataTable 생성
var requiredDataTable = $('#requiredDataTable').DataTable({
    dom: 'Blfrtip',
    addTableClass: 'col-lg-12 px-0',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/site/main/ajaxCourseList",
        "type": "POST",
        "data": function (d) {
            d.courseMainKindName = "required";
            d.courseMainKindCd = "06"
            d.courseKindCd = $("#courseKindCd").val();
            d.bRunning = bRunningRequired;
        },
        dataSrc: "data",
        complete: function (data) {
            $("#requiredTableCount").val(data.responseJSON.recordsTotal);
            $('#requiredCheckAll').prop("checked", false);
            if (bRunningRequired) {
                setCount({
                    courseMainKindName: "required",
                    courseMainKindCd: "06",
                    TotalCount: data.responseJSON.records.requiredTOTAL,
                    ELCount: data.responseJSON.records.requiredEL,
                    PLCount: data.responseJSON.records.requiredPL,
                    OLCount: data.responseJSON.records.requiredOL,
                    LLCount: data.responseJSON.records.requiredLL,
                    BLCount: data.responseJSON.records.requiredBL,
                })
            }
            doCheckSortRule('06');
            checkLineup();
            bRunningRequired = true;
        }
    },
    "columns": [{
        data: ''
    }, {
        data: ''
    }, {
        data: 'COURSE_KIND_NM'
    }, {
        data: 'COURSE_NAME'
    }, {
        data: 'LABOR_REFUND_YN'
    }, {
        data: 'REG_DTIME'
    }, {
        data: ''
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '<input type="checkbox" value="' + row.COURSE_MAIN_SEQ + '" id="requiredCheckbox' + meta.row + '" name="requiredCheckbox" />';
                html += '<label for="requiredCheckbox' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        },
        {
            targets: 1,
            'render': function (data, type, row, meta) {
                var info = requiredDataTable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            targets: 6,
            'render': function (data, type, row, meta) {
                // var linup = row.LINEUP || '';
                return '<input id="requiredLineup' + meta.row + '" class="text-center lineup06" type="number" min="1" max="' + requiredDataTable.ajax.json().records.requiredTOTAL + '" placeholder="' + row.LINEUP + '">';
            }
        },
        {
            'targets': [0, 1, 2, 4, 5, 6],
            'className': 'dt-body-center'
        }
    ]
});


// modal-SearchCourse01Datatable 생성
var SearchCourse01Datatable = $('#SearchCourse01Datatable').DataTable({
    dom: 'Blfrtip',
    addTableClass: '',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/site/main/ajaxSearchCourseList",
        "type": "POST",
        "data": function (d) {
            d.courseKindCd = $("#search01CourseKindCd").val();
            d.searchField = $("#search01SearchField").val();
            d.useYn = $("#search01UseYn").val();
            d.searchKw = $("#search01SearchKw").val();
            d.bRunning = bRunningSearch01;
        },
        dataSrc: "data",
        complete: function (data) {
            $("#search01TotalCount").text(data.responseJSON.recordsTotal);
            $('#search01CheckAll').prop("checked", false);
        }
    },
    "columns": [{
        data: ''
    }, {
        data: ''
    }, {
        data: 'COURSE_KIND_NM'
    }, {
        data: 'COURSE_NAME'
    }, {
        data: 'LABOR_REFUND_YN'
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {

                var html = '<div class="checkbox checkbox-css">';
                html += '<input type="checkbox" value="' + row.COURSE_CODE + '" id="search01Checkbox' + meta.row + '" name="search01Checkbox" />';
                html += '<label for="search01Checkbox' + meta.row + '">&nbsp;</label>';
                html += '</div>';

                return html;
            }
        },
        {
            targets: 1,
            'render': function (data, type, row, meta) {
                var info = SearchCourse01Datatable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },
        {
            'targets': [0, 1, 2, 3, 4],
            'className': 'dt-body-center'
        }
    ]
});


// modal-SearchCourse02Datatable 생성
var SearchCourse02Datatable = $('#SearchCourse02Datatable').DataTable({
    dom: 'Blfrtip',
    addTableClass: 'col-lg-12 px-0',
    lengthChange: false,
    ordering: false,
    searching: false,
    initialLoad: false,
    pageLength: 20,
    buttons: [],
    ajax: {
        "url": "/site/main/ajaxSearchCourseList",
        "type": "POST",
        "data": function (d) {
            d.courseKindCd = $("#search02CourseKindCd").val();
            d.searchField = $("#search02SearchField").val();
            d.useYn = $("#search02UseYn").val();
            d.searchKw = $("#search02SearchKw").val();
            d.bRunning = bRunningSearch02;
        },
        dataSrc: "data",
        complete: function (data) {
            $("#search02TotalCount").text(data.responseJSON.recordsTotal);
        }
    },
    "columns": [{
        data: ''
    }, {
        data: 'COURSE_KIND_NM'
    }, {
        data: 'COURSE_NAME'
    }, {
        data: 'LABOR_REFUND_YN'
    }],
    columnDefs: [{
            targets: 0,
            'render': function (data, type, row, meta) {
                var info = SearchCourse02Datatable.page.info();
                return info.recordsTotal - (info.page * info.length + meta.row);
            }
        },{
            targets: 2,
            'render': function (data, type, row, meta) {
                return '<a href="javascript:;" onclick="fn:setPromotionCourse(\'' + row.COURSE_CODE + '\')"">'+ row.COURSE_NAME + '</a>';
            }
        },
        {
            'targets': [0, 1, 2, 3],
            'className': 'dt-body-center'
        }
    ]
});