/**
 * change byte to KB, MB, GB, TB, PB, EB, ZB, YB(<MB>)
 * @param {*} byte 
 */
function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function isEmpty(value) {
    if (value === null) return true;
    if (typeof value === 'undefined') return true;
    if (typeof value === 'string' && value === '') return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return true;
    if (typeof value === 'object' && value.constructor.name === 'String' && Object.keys(value).length < 1) return true;
    return false;
};

var textarea = $('textarea[maxlength]');
textarea.bind("keydown keyup click", function () {
    var max = $(this).attr('maxlength');
    if ($(this).val().length > max) {
        $(this).val($(this).val().substr(0, max));
    }
});