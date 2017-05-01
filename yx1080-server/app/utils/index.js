'use strict';

/**
 * 数组删除元素
 * @param key 需要匹配的属性名字
 * @param value 匹配值
 */
Array.prototype.remove = function (key, value) {
	let i = -1, element;
	if(value === undefined){
		i = this.indexOf(key);
	} else {
		i = this.findIndex(m => m[key] === value);
	}
	if(i !== -1) {
		element = this[i];
		this.splice(i, 1);
	}
	return element;
};

/**
 * 随机ID
 * @param len 可指定长度
 */
const randomId = exports.randomId = len => Math.random().toString().substr(2, len);

/**
 * 唯一ID
 * 根据时间戳生产
 */
exports.id = () => Date.now() + randomId(4);

/**
 * 根据session获取客户端ip
 * @param session
 */
exports.ip = session => session.__session__.__socket__.remoteAddress.ip.replace('::ffff:', '');

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