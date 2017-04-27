
/**
 * 事件驱动
 */

 

// 事件列表
let events = {};

/**
 * 监听事件
 * @param  {[type]} type   [description]
 * @param  {[type]} listen [description]
 * @return {[type]}        [description]
 */
exports.listen = function (type, listen) {
	let event = events[type];
	if(!event){
		event = [];
		events[type] = event;
	}
	event.push(listen);
	// console.log('监听一个事件 type=', type, 'listen=', listen);
};

/**
 * 派发事件
 * @param  {[type]} type [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.dispatch = function(type, data){
	let event = events[type];
	if(event){
		for (let i = event.length-1; i >= 0; i--) {
			event[i](data);
		}
	}
};

/**
 * 删除一个事件
 * @param  {[type]} type   [description]
 * @param  {[type]} listen [description]
 * @return {[type]}        [description]
 */
exports.remove = function(type, listen){
	if(!listen){
		delete events[type];
		return;
	}
	let event = events[type];
	if(event){
		for (let i = event.length-1; i >= 0; i--) {
			if(event[i] === listen){
				event.splice(i,1);
				// console.log('删除一个事件 type=', type, 'listen=', listen);
				break;
			}
		}
	}
};

exports.print = function(){
	console.log('events:', events);
};