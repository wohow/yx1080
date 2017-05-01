'use strict';

const async = require('async');
const utils = require('../../../utils');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

/**
 * 链接服务器 获取账户信息
 * @param uid, token
 */
Handler.prototype.entry = function(msg, session, next) {

	let {uid, token} = msg;

	async.waterfall([
		cb => this.app.rpc.gate.authRemote.auth(session, token, cb),// 验证token
		cb => this.app.get('sessionService').kick(uid, cb),// 先踢掉
		cb => session.bind(uid, cb),// 在绑定
		cb => {
			// 监听离线
			session.on('closed', userLeave.bind(null, this.app));
			// 获取角色信息
			let ip = utils.ip(session);
			this.app.rpc.hall.userRemote.getUser(session, uid, session.frontendId, ip, cb);
		}
	], (err, user)=> {
		if(err) {
			return next(null, {code: 500, error: err.message});
		}
		console.log(user.nickname, '进入游戏');
		next(null, {code: 200, user: user});
	});
};


// 退出
function userLeave(app, session){
	if(!session || !session.uid) {
		return;
	}
	
	app.rpc.hall.userRemote.userLeave(session, session.uid, (user) => {
		console.log(user.nickname, '离开游戏');
	});
}