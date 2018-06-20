var getRandomKey = function(length) { //生成随机的一个key,长度为length
    var str = '';
    for (var i = 0; i < length; i++) {
        str += String.fromCharCode(Math.random() * 20901 >> 0 + 19968);
    }
    return str;
}