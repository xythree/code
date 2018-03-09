
//禁用键盘F12,其它的同理
document.onkeydown = function (e) {
    if (e.keyCode === 123) {
        window.event.returnValue = false
    }
}
//微信聊天图片大小生成算法  https://www.v2ex.com/t/383196#reply6
//根据宽高比来设置外框的 size
if (ratio < 0.4 ){
  width = 204; //这是从微信截图的长度最后需要同一除以 3
  height = 510;
  $img.parentElement.classList.add('overflowHeight'); //设置高度溢出部分隐藏
}else if(ratio >= 0.4 && ratio <= 0.5){
  width = 204;
  height = 204/ratio;
} else if(ratio > 0.5 && ratio < 1) {
  width = 405 * ratio;
  height = 405;
} else if(ratio >= 1 && ratio < 1/0.5) { //和前面的宽高转置
  height = 405 * (1/ratio);
  width = 405;
} else if (ratio >= 1/0.5 && ratio < 1/0.4) {
  height = 204;
  width = 204 / (1/ratio);
} else if (ratio >= 1/0.4) {
  height = 204; //这是从微信截图的长度最后需要同一除以 3
  width = 510;
  $img.parentElement.classList.add('overflowWidth');
}
height /= 3;
width /= 3;
/*  http://web.jobbole.com/91772/
* 适用于获取屏幕宽度等分设置html的font-size情况，比如 flexible.js库
*/
//计算最终html font-size
function modifileRootRem () {
    var root = window.document.documentElement;
    var fontSize = parseFloat(root.style.fontSize);
    var finalFontSize = parseFloat(window.getComputedStyle(root).getPropertyValue("font-size"));
    if(finalFontSize === fontSize) return;
    root.style.fontSize = fontSize+(fontSize-finalFontSize) + "px";
}
if(typeof window.onload === 'function'){
    var oldFun = window.onload;
    window.onload = function(){
        oldFun();
        modifileRootRem();
    }
}else{
    window.onload = modifileRootRem;
}
/*
* 加载js文件或者jsonp
*/
function loadScript(src, callback) {
    var doc = document
    var script = doc.createElement("script")
    var jsoncallback = ""
    script.async = true
    script.src = src.replace(/jsoncallback=(\?)/, function(){
        jsoncallback = "jsonp" + +new Date
        return "jsoncallback=" + jsoncallback
    })
    doc.body.appendChild(script)
    
    function _callback(callback) {
        if (typeof callback == "function") {
            if (jsoncallback) {
                window[jsoncallback] = callback
            }
            script.onload = script.onreadystatechange = function () {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    //防止IE内存泄漏
                    script.onload = script.onreadystatechange = null
                    if (script.parentNode) {
                        script.parentNode.removeChild(script)
                    }
                    if (jsoncallback) {
                        window[jsoncallback] = undefined
                    } else {
                        callback()
                    }
                }
            }
        }
    }
    if (callback) {
        _callback(callback)
    } else {
        return {
            then: function (callback) {
                _callback(callback)
            }
        }
    }
}
/* load js
loadScript("/js/jquery.1.8.3.js", function () {
    console.log($)
})
*/
/* jsonp
loadScript("http://localhost:9090/jsonp?jsoncallback=?").then(function (d) {
    console.log(d)
})
*/
/* 判断节点是否在可视区域内 */
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    )
}


//execCommand 手机上复制文本
function copyText(txt, callback) {
	const doc = document
	const input = doc.createElement('input')
    
	input.setAttribute('readonly', 'readonly') //防止屏幕下方出现白屏抖动
    input.setAttribute('value', txt)
    doc.body.appendChild(input)
	input.select()//pc上需要
	input.setSelectionRange(0, 9999)//mobile上需要
	
	if (doc.execCommand('copy')) {		
		callback && callback()
	}
    doc.body.removeChild(input)
})






