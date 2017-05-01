'use strict';

const User = require('./User');

/**
 * 用户管理中心
 */

let users = {};

// 获取在线用户
exports.getUser = function(uid) {
	return users[uid];
};

// 创建用户
exports.createUser = function(opts) {
	let user = new User(opts);
	users[user.uid] = user;
	return user;
};

// 删除一个玩家
exports.removeUser = function (uid) {
	delete users[uid];
};