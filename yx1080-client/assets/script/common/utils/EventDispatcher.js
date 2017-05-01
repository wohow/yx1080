
/**
 * 事件驱动
 */

// 事件列表
let events = {};

/**
 * 派发事件
 * @param  type
 * @param  data
 */
exports.emit = (type, data) => {
	let event = events[type];
	if(event){
		for (let i = event.length-1; i >= 0; i--) {
			let {callback, target} = event[i];
			callback.call(target, data);
		}
	}
};

/**
 * 监听事件
 * @param  type
 * @param  callback
 * @param  target
 */
exports.on = (type, callback, target) => {
	let event = events[type] = events[type] || [];
	if(event.find((m) => m.callback.toString() == callback.toString() && m.target == target)){
		return console.error('重复监听事件', type, target.name+'.'+callback.name);
	}
	event.push({
		callback: callback,
		target: target
	});
};

/**
 * 删除一个事件
 * @param  type
 * @param  callback
 * @param  target
 */
exports.off = (type, callback, target) => {
	let event = events[type];
	if(!event){
		return;
	}
	if(callback === undefined){
		delete events[type];
	} else {
		for (let i = event.length-1; i >= 0; i--) {
			let handler = event[i];
			if(handler.target == target && handler.callback.toString() == callback.toString()){
				event.splice(i,1);
				break;
			}
		}
		if(event.length === 0){
			delete events[type];
		}
	}
};

exports.print = function(){
	console.log('events:', events);
};