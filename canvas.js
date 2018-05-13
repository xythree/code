
//绘制圆形图片
function radius(params, callback) {
    let img = new Image
    
    img.onload = function () {
        let w,h
        let canvas = document.createElement('canvas')
        
        if (img.width > img.height) {
            w = img.height
            h = img.height
        } else {
            w = img.width
            h = img.width
        }
        
        canvas.width = w
        canvas.height = h               
        
        let ctx = canvas.getContext("2d")
        
        let cli = {
            x: params.x || w / 2,
            y: params.y || h / 2,
            r: params.r || w / 2
        }

        
        
        ctx.clearRect(0, 0, w, h)
        ctx.save()
        ctx.beginPath()
        ctx.arc(cli.x, cli.y, cli.r, 0, Math.PI * 2, false)
        ctx.clip()
        ctx.drawImage(img, 0, 0, w, h)

        callback && callback(canvas.toDataURL())
    }
    
    img.src = params.src
}

/*
radius({
    src: img.src,   
    r: 100
}, function (src) {
    img.src = src
})
*/


//绘制圆角图片
function roundRect(params, callback) {
    let img = new Image
    
    let roundRect = function (ctx, x, y, w, h, r) {
        if (w < 2 * r) r = w / 2
        if (h < 2 * r) r = h / 2
        
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.arcTo(x + w, y, x + w, y + h, r) //右上
        ctx.arcTo(x + w, y + h, x, y + h, r) //右下
        ctx.arcTo(x, y + h, x, y, r)  //左下
        ctx.arcTo(x, y, x + w, y, r)   //左上
        ctx.closePath()
        
        return ctx
    }
    
    img.onload = function () {
        let w,h
        let canvas = document.createElement('canvas')
        let r = params.r || 20
        
        if (params.w && params.h) {
            w = params.w
            h = params.h
        } else if (img.width > img.height) {
            w = img.height
            h = img.height
        } else {
            w = img.width
            h = img.width
        }
        
        canvas.width = w
        canvas.height = h               
        
        let ctx = canvas.getContext("2d")
        
        ctx.clearRect(0, 0, w, h)
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = params.borderWidth || 1
        ctx.strokeStyle = params.borderColor || "transparent"
        
        roundRect(ctx, 0, 0, canvas.width, canvas.height, r).stroke()
        
        ctx.clip()
        ctx.drawImage(img, 0, 0, w, h)

        callback && callback(canvas.toDataURL())
    }
    
    img.src = params.src
}

/*
roundRect({
    src: img.src,   
    w: 250,  //宽高要同时传，如果不传宽高则根据图片大小适配
    h: 150,
    borderWidth: 1,
    borderColor: "transparent",
    r: 20
}, function (src) {
    img.src = src
})

*/






/* polygon方法绘制的形状大致如下，带圆角
       ---
     /   |
    /    |
    ------  

*/
function polygon(params, callback) {
    let img = new Image
    
    let roundRect = function (ctx, x, y, w, h, r, v) {
        if (w < 2 * r) r = w / 2
        if (h < 2 * r) r = h / 2
        
        ctx.beginPath()
        ctx.moveTo(x + r, y)
        ctx.arcTo(x + w, y, x + w, y + h, r) //右上
        ctx.arcTo(x + w, y + h, x, y + h, r) //右下
        ctx.arcTo(x - v, y + h, x, y, r)  //左下
        ctx.arcTo(x, y, x + w, y, r)   //左上
        ctx.closePath()
        
        return ctx
    }
    
    img.onload = function () {
        let w,h
        let canvas = document.createElement('canvas')
        let r = params.r || 20
        let v = params.v || 50
        
        if (params.w && params.h) {
            w = params.w
            h = params.h
        } else if (img.width > img.height) {
            w = img.height
            h = img.height
        } else {
            w = img.width
            h = img.width
        }
        
        canvas.width = w
        canvas.height = h               
        
        let ctx = canvas.getContext("2d")
        
        ctx.clearRect(0, 0, w, h)
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = params.borderWidth || 1
        ctx.strokeStyle = params.borderColor || "transparent"
        
        roundRect(ctx, v, 0, canvas.width - v, canvas.height, r, v).stroke()
        
        ctx.clip()
        ctx.drawImage(img, 0, 0, w, h)

        callback && callback(canvas.toDataURL())
    }
    
    img.src = params.src
}

/*
polygon({
    src: img.src,
    //w: 250,  //宽高要同时传，如果不传宽高则根据图片大小适配
    //h: 150,
    borderWidth: 1,
    borderColor: "transparent",
    r: 20,
    v: 100
}, function (src) {
    img.src = src
})
*/

















