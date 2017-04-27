
/**
 * 工具类
 */


/**
 * 判断对象是否空对象{}
 */
exports.isEmptyObject = function(obj) {
    for (var k in obj)
        return false;
    return true;
};

/**
 * 随机一个整数 包括min和max
 * @param  {[Number]} min [最小值]
 * @param  {[Number]} max [最大值]
 * @return {[Number]}
 */
const random = exports.random = function(min, max){
    let count = Math.max(max - min, 0) + 1;
    return Math.floor(Math.random()*count) + min;
};

/**
 * 随机一个下标出来
 * @param  {[Number]} len    [数组长度]
 * @param  {[Number]} count  [需要随机的个数](可不填)
 * @param  {[Number]} ignore [需要忽略的下标](可不填)
 * @return {[Number|Array]}  [如果count大于1 则返回count长度的数组下标 不重复]
 */
exports.randomIndex = function(len, count, ignore){
    if(len === 0){
        return -1;
    }
    let indexs = [];
    count = count || 1;
    count = count > len ? len : count;
    for (let i = 0; i < len; i++) {
        if(i === ignore)
            continue;
        indexs.push(i);
    }
    let ret = [];
    for (let i = 0; i < count; i++) {
        let idx = random(0, indexs.length-1);
        ret.push(indexs[idx]);
        indexs.splice(idx, 1);
    }
    return ret.length === 1 ? ret[0] : ret;
};

/**
 * 将一个常数变成1
 */
exports.cTo1 = function(n){
    return n === 0 ? 0 : n / Math.abs(n);
};

// 获取两点之间的角度
function getAngle(px,py,mx,my){
    //获取两点间的相对角度
    var x = Math.abs(px-mx);
    var y = Math.abs(py-my);
    var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    var cos = y/z;
    var radina = Math.acos(cos);
    var angle = Math.floor(180/(Math.PI/radina));
    //在第四象限
    if(mx>px&&my>py){angle = 180 - angle;}
    //在y轴负方向上
    if(mx==px&&my>py){angle = 180;}
    //在x轴正方向上
    if(mx>px&&my==py){angle = 90;}
    //在第三象限
    if(mx<px&&my>py){angle = 180 + angle;}
    //在x轴负方向
    if(mx<px&&my==py){angle = 270;}
    //在第二象限
    if(mx<px&&my<py){angle = 360 - angle;}
    return angle;
}
exports.rotation = function(a, b){
    return getAngle( b.x, b.y, a.x, a.y );
};

/**
 * 给一个button添加一个事件
 */
exports.addEventHandler = (button, component, callback, data)=> {
    if(!button){
        return console.error('addEventHandler error button is null');
    }
    if(!component){
        return console.error('addEventHandler error node is null');
    }
    if(!component[callback]){
        return console.error('addEventHandler error component.callback not exist');
    }
    let clickEventHandler = new cc.Component.EventHandler();
    clickEventHandler.target = component.node; //这个 node 节点是你的事件处理代码组件所属的节点
    clickEventHandler.component = component.__proto__.__classname__;//这个是代码文件名
    clickEventHandler.handler = callback;
    clickEventHandler.customEventData = data;
    button.clickEvents.push(clickEventHandler);
};

/**
 * 播放动画
 * @param  {[type]}   anim [动画类]
 * @param  {Function} cb   [动画播放完成后回掉]
 * @param  {[type]}   name [名字 可不填]
 * @return {[type]}        [description]
 */
exports.playAnimation = function (anim, cb, name) {
    var callback = function () {
        anim.off('finished', callback);
        cb();
    };
    if (name) {
        anim.play(name);
    } else {
        anim.play();
    }
    anim.on('finished', callback);
};

/**
 * 设置一个值 避免空
 */
const setValueAvoidNull = exports.setValueAvoidNull = function (node, key, value) {
    if (node) {
        node[key] = value;
    }
};

/**
 * 将一个毫秒数 转成00:00:00格式
 */
exports.millisecondToDate = function (msd, fmt) {
    var time = msd / 1000;
    var hour = Math.floor(time / 3600.0);
    var minute = Math.floor((time % 3600) / 60);
    var second = Math.floor(time - (hour * 3600) - (minute * 60));
    if (fmt) {//HH:mm:ss
        fmt = fmt.replace('HH', timeToString(hour));
        fmt = fmt.replace('mm', timeToString(minute));
        fmt = fmt.replace('ss', timeToString(second));
        return fmt;
    }
    return timeToString(hour) + ':' + timeToString(minute) + ':' + timeToString(second);
};
function timeToString(t) {
    return (t < 10 ? '0' : '') + t;
}

/**
 * @pram
 */
exports.gotoNumber = function (label, currNum, toNum, cb) {
    var time = 1000 / 20;
    var value = (toNum - currNum) / 20;
    for (var i = 20; i > 0; i--) {
        let j = i;
        setTimeout(() => {
            currNum += Math.floor(value);
            setValueAvoidNull(label, 'string', currNum);
            if(toNum === currNum && cb) cb();
        }, time * j);
    }
}