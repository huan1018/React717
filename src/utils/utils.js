export function getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arrName = arr[i].split('=');
        if (arrName[0] == name) {
            return arrName[1];
        }
    }
    return '';
}