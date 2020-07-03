$(document).ready(function () {
    $("#setSms").on("click", function (event) {
        setSms();
    });

    // 이메일발송 클릭시
    $("#setMail").on("click", function (event) {
        setMail();
    });

    // 쪽지발송 클릭시
    $("#setMemo").on("click", function (event) {
        setMemo();
    });


    doCalculMessage = function (message) {
        var nbytes = 0;

        for (i = 0; i < message.length; i++) {
            var ch = message.charAt(i);

            if (escape(ch).length > 4) {
                nbytes += 2;
            } else if (ch == '\n') {
                if (message.charAt(i - 1) != '\r') {
                    nbytes += 1;
                }
            } else if (ch == '<' || ch == '>') {
                nbytes += 2;
            } else {
                nbytes += 1;
            }
        }
        return nbytes;
    }


    doCheckLength = function (nm, length_limit) {
        
        var length = doCalculMessage($('#smsContent')[0].value);
        $('#textRight')[0].innerText = length;

        if (length > length_limit) {
            alert(nm + "는 한글 " + (length_limit / 2) + "자, 영문 " + length_limit + "자까지 입력할 수 있습니다");
            $('#smsContent')[0].value = $('#smsContent')[0].value.replace(/\r\n$/, "");
            $('#smsContent')[0].value = doMessage($('#smsContent')[0].value, length_limit);

            return true;
        }else{
            return false;
        }
    }


    doMessage = function (message, maximum) {
        var inc = 0;
        var nbytes = 0;
        var msg = "";
        var msglen = message.length;

        for (i = 0; i < msglen; i++) {
            var ch = message.charAt(i);
            if (escape(ch).length > 4) {
                inc = 2;
            } else if (ch == '\n') {
                if (message.charAt(i - 1) != '\r') {
                    inc = 1;
                }
            } else if (ch == '<' || ch == '>') {
                inc = 2;
            } else {
                inc = 1;
            }
            if ((nbytes + inc) > maximum) {
                break;
            }
            nbytes += inc;
            msg += ch;
        }
        $('#textRight')[0].innerText = nbytes;
        return msg;
    }

});


//(sms, 쪽지, 메일) 페이지 회원정보조회
function getSendMemberList(seqs) {
    var resultData;
    var param = {
        memberSeqs: seqs
    };
    $.ajax({
        url: '/member/ajaxSmsMemberList',
        contentType: 'application/json',
        type: 'POST',
        async: false,
        data: JSON.stringify(param),
        success: function (data) {
            console.log(data);
            resultData = data;

        },
        error: function () {
            console.log('error');
        }
    });

    return resultData;
}

//sms전송 화면조회
function getSmsMemberList(seqs) {
    var sendMembersData = getSendMemberList(seqs)

    dt = JSON.parse(sendMembersData.member);
    var html = '';
    for (var i = 0; i < dt.length; i++) {
        var row_dt = dt[i];
        html += '<tr>';
        html += '<td class="text-center">' + row_dt.LOGIN_ID + '</td>';
        html += '<td class="text-center">' + row_dt.MEMBER_NAME + '</td>';
        html += '<td class="text-center">' + row_dt.MOBILE + '</td>';
        html += '<td class="text-center">' + row_dt.CMPY_NAME + '</td>';
        html += '</tr>';

    }

    seqs = sendMembersData.seqs;

    $("#buttonsSms").append('<input type="hidden" id="smsSeqs" name="smsSeqs" value="' + seqs + '"/>');
    $("#smsBody").html(html);
}

//sms 전송
function setSms() {

    var param = {
        memberSeqs: $("#smsSeqs").val(),
        content: $("#smsContent").val(),
        callback: $("#smsCallback").val()
    };

    swal({
        title: '전송하시겠습니까?',
        icon: 'info',
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
                className: 'btn btn-info',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {

        if (isConfirm) {

            $.ajax({
                url: '/sms/setSms',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(param),
                success: function (data) {
                    console.log(data);
                    swal({
                        title: '완료되었습니다.',
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
                    });
                    $('#buttonsSms').modal('hide');
                    getData();
                },
                error: function () {
                    console.log('error');
                }
            });
        }
    });
}

//Memo전송 화면조회
function getMemoMemberList(seqs) {
    var sendMembersData = getSendMemberList(seqs)
    var memberIdList = []
    dt = JSON.parse(sendMembersData.member);

    for (var i = 0; i < dt.length; i++) {
        var row_dt = dt[i];
        memberIdList.push(row_dt.LOGIN_ID);
    }

    var memoIds = memberIdList.join(',');
    $("#memoIds").val(memoIds);
    seqs = sendMembersData.seqs;

    $("#buttonsMemo").append('<input type="hidden" id="memoSeqs" name="memoSeqs" value="' + seqs + '"/>');
}

//쪽지 전송
function setMemo() {
    var param = {
        memberSeqs: $("#memoSeqs").val(),
        content: $("#memoContent").val()
    };
    $.ajax({
        url: '/memo/setMemo',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify(param),
        success: function (data) {
            console.log(data);
            swal({
                title: '완료되었습니다.',
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
            });
            $('#buttonsMemo').modal('hide');
            getData();
        },
        error: function () {
            console.log('error');
        }
    });
}

//메일전송 화면조회
function getMailMemberList(seqs) {
    var sendMembersData = getSendMemberList(seqs)

    dt = JSON.parse(sendMembersData.member);
    var html = '';
    for (var i = 0; i < dt.length; i++) {
        var row_dt = dt[i];
        html += '<tr>';
        html += '<td class="text-center">' + row_dt.LOGIN_ID + '</td>';
        html += '<td class="text-center">' + row_dt.MEMBER_NAME + '</td>';
        html += '<td class="text-center">' + row_dt.EMAIL + '</td>';
        html += '<td class="text-center">' + row_dt.CMPY_NAME + '</td>';
        html += '</tr>';

    }
    seqs = sendMembersData.seqs;

    $("#buttonsMail").append('<input type="hidden" id="mailSeqs" name="mailSeqs" value="' + seqs + '"/>');
    $("#mailBody").html(html);

}

//메일 전송
function setMail() {
    var param = {
        memberSeqs: $("#mailSeqs").val(),
        content: $("#mailContent").val(),
        subject: $("#mailSubject").val()
    };

    swal({
        title: '전송하시겠습니까?',
        icon: 'info',
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
                className: 'btn btn-info',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {

        if (isConfirm) {

            $.ajax({
                url: '/mail/setMail',
                contentType: 'application/json',
                type: 'POST',
                data: JSON.stringify(param),
                success: function (data) {
                    console.log(data);
                    swal({
                        title: '완료되었습니다.',
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
                    });
                    $('#buttonsMail').modal('hide');
                    getData();
                },
                error: function () {
                    console.log('error');
                }
            });
        }
    });
}