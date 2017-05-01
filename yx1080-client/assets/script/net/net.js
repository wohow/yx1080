
const wc = require('WaitConnection');


/**
 * 服务器断开
 */
exports.onDisconnect = function(cb){
	pomelo.on('disconnect', cb);
};

exports.offDisconnect = function () {
	pomelo.removeAllListeners('disconnect');
};

/**
 * 连接服务器
 * @param  {[type]}   address [服务器地址]
 * @param  {Function} cb      [成功回掉]
 */
exports.connect = function(address, cb){
	pomelo.disconnect();
	pomelo.init(address, cb);
};

/**
 * 发送消息
 */
exports.send = function(route, msg, cb, isWait = true){
	if (cb) {
		request(route, msg, cb, isWait);
	} else {
		notify(route, msg);
	}
};

/**
 * 监听消息
 */
exports.on = function (route, cb, target) {
	let listener = cb;
	if(target){
		let events = target._pomelo_events_ = target._pomelo_events_ || {};
		listener = events[route] = cb.bind(target);
	}
	pomelo.on(route, listener);
};

exports.once = function (route, cb) {
	pomelo.once(route, cb);
};

exports.off = function (route, cb) {
	let listener = cb;
	if(typeof(cb) !== 'function'){
		let events = cb._pomelo_events_ || {};
		listener = events[route] || function(){};
		delete events[route];
	}
	pomelo.removeListener(route, listener);
};


function request(route, msg, cb, isWait){
	if(isWait){
		wc.wait(true);
	}
	pomelo.request(route, msg, function(data){
		wc.wait(false);
		cb(data);
	});
}

function notify(route, msg){
	pomelo.notify(route, msg);
}