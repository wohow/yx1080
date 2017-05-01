'use strict';

const crc = require('crc');
const utils = require('../../../utils');
const dispatcher = require('../../../utils/dispatcher');
const TokenService = require('../../../services/TokenService');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

// 临时数据
let accounts = [];

// 登陆 account_uid
const _login = function (uid, next) {
	let account = accounts.find((m) => m.uid === uid);
	if(!account){
		return next(null, {code: 500, error: '用户不存在'});
	}
	// 分发服务器地址
	let server = dispatcher.dispatch(uid);
	if(!server){
		return next(null, {code: 500, error: '服务器已关闭'});
	}
	// 生成token
	let token = TokenService.create(uid);

	next(null, {
		code: 200,
		uid: uid,
		token: token,
		server: {host: server.clientHost, port: server.clientPort}
	});
};

/**
 * 游客登陆
 * @param guestid
 */
Handler.prototype.guest = function(msg, session, next) {
	let guestid = msg.guestid;
	let account = accounts.find((m) => m.guestid === guestid);
	let uid = account && account.uid;
	if(!uid){
		uid = Math.abs(crc.crc32(guestid)).toString();
		accounts.push({
			uid: uid,
			guestid: guestid,
		});
	}
	_login(uid, next);
};

/**
 * 微信授权
 * @param code,os
 */
Handler.prototype.wechatAuth = function(msg, session, next) {
	next(null, {
		code: 500,
		error: 'xxxxxx'
	});
};

/**
 * 通过uid直接登陆
 * 获取服务器地址 和 token
 */
Handler.prototype.login = function(msg, session, next) {
	_login(msg.uid, next);
};