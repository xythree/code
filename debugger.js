!function test() {
    // 捕获异常，递归次数过多调试工具会抛出异常。
    try{
        !function cir(i)
        {
            // 当打开调试工具后，抛出异常，setTimeout执行test无参数，此时i == NaN，("" + i / i).length == 3
            // debugger设置断点
            ( 1 !== ( "" + i / i).length || 0===i ) && function(){}.constructor("debugger")(),cir(++i);
        } (0)
    } catch(e) {
        setTimeout(test,500)
    }
}();