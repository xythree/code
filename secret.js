let getRandomKey = function(length) { //生成随机的一个key,长度为length
    let str = ''
    for (let i = 0; i < length; i++) {
        str += String.fromCharCode(Math.random() * 20901 >> 0 + 19968)
    }
    return str
}

let encode = function(key, str) { //加密
    let rs = ''
    for(let i = 0, j = 0; i < str.length; i++, j++) {
        if(j == key.length) {
            j = 0
        }
        let str_code = str.charCodeAt(i),
            key_code = key.charCodeAt(j)
        rs += String.fromCharCode(str_code ^ key_code)
    }
    return escape(rs)
}

let decode = function(key, str) { //解密
    str = unescape(str)
    let rs = ''
    for(let i = 0, j = 0; i < str.length; i++, j++) {
        if(j == key.length) {
            j = 0
        }
        let str_code = str.charCodeAt(i),
            key_code = key.charCodeAt(j)
        rs += String.fromCharCode(str_code ^ key_code)
    }
    return rs
}

//base64 或者 window.btoa是编码，window.atob是解码
let Base64 = {
     _table: [//对照表
     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
     'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
     'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
     'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
     ],
     encode: function(str) {
         let bin=str.split('').map(function(n,i){
             return n.charCodeAt(0);
         });
         let codes = [];
         let un = 0;
         un = bin.length % 3;
         if(un == 1)
             bin.push(0, 0);
         else if(un == 2)
             bin.push(0);
         for(let i = 2; i < bin.length; i += 3) {
             let c = bin[i - 2] << 16;
             c |= bin[i - 1] << 8;
             c |= bin[i];
             codes.push(this._table[c >> 18 & 0x3f]);
             codes.push(this._table[c >> 12 & 0x3f]);
             codes.push(this._table[c >> 6 & 0x3f]);
             codes.push(this._table[c & 0x3f]);
         }
         if(un >= 1) {
             codes[codes.length - 1] = "=";
            bin.pop();
         }
         if(un == 1) {
             codes[codes.length - 2] = "=";
             bin.pop();
         }
         return codes.join("");
     },
     decode: function(base64Str) {
         let i = 0;
         let bin = [];
         let x = 0,
         code = 0,
         eq = 0;
         while(i < base64Str.length) {
             let c = base64Str.charAt(i++);
             let idx = this._table.indexOf(c);
             if(idx == -1) {
                 switch(c) {
                     case '=':
                     idx = 0;
                     eq++;
                     break;
                 case ' ':
                 case '\n':
                 case "\r":
                 case '\t':
                     continue;
                 }
             }
             code = code << 6 | idx;
             if(++x != 4)
                 continue;
             bin.push(code >> 16);
             bin.push(code >> 8 & 0xff);
             bin.push(code & 0xff)
             code = x = 0;
         }
         if(eq == 1)
             bin.pop();
         else if(eq == 2) {
            bin.pop();
             bin.pop();
         }
         return bin.map(function(n,i){
             return String.fromCharCode(n);
         }).join('');
     }
}



















