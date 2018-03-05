
// 判断发帖时间与现在时间的间隔
exports.getLastTime = (creatTime) => {
    let oldTime = new Date(creatTime)
    let newTime = (new Date() - oldTime) / 1000
    let month = Math.floor(newTime / 3600 / 24 / 30)
    let day = Math.floor(newTime / 3600 / 24)
    let hours = Math.floor(newTime / 3600)
    let mins = Math.floor(newTime / 60)
    let str = ""
    if (hours === 0) {
        str = Math.max(mins, 1) + "分钟前"
    } else if (day === 0) {
        str = hours + "小时前"
    } else if (month === 0) {
        if (day == 1) {
            str = "昨天"
        } else if (day == 2) {
            str = "前天"
        } else {
            str = day + "天前"
        }
    } else {
        if (month > 12) {
            str = oldTime.getFullYear() + "年" + oldTime.getMonth() + 1 + "月" + oldTime.getDate() + "日"
        } else {
            str = month + "月前"
        }
    }
    return str
}
//移动终端浏览器版本信息
exports.ua = () => {
    var u = navigator.userAgent
    var u2 = navigator.userAgent.toLowerCase()
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) == "micromessenger",
        ali: u.indexOf('AliApp') > -1
    }
}
//获取url参数
exports.getUrlParame = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    var result = window.location.search.substr(1).match(reg)
    if (result != null) {
        return unescape(result[2])
    } else {
        return null
    }
}
//localStorage 剩余容量
exports.localStorageCapacity = () => {
    return 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length
}
exports.htmlEscape = (context) => {
    return context.replace(/[<>"&]/g, function(match){
        switch(match){
            case "<":
                return "&lt;"
            case ">":
                return "&gt;"
            case "&":
                return "&amp;"
            case "\"":
                return "&quot;"
        }
    })
}