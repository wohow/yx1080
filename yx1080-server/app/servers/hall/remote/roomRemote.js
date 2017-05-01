'use strict';

const RoomInfo = require('../../../domain/hall/RoomInfo');
const UserMgr = require('../../../domain/hall/UserMgr');

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};

// 删除一个房间
Remote.prototype.removeRoom = function(roomId, users, cb) {
	RoomInfo.remove(roomId);
	// 设置玩家 房间信息
	for (let i = users.length - 1; i >= 0; i--) {
		let user = UserMgr.getUser(users[i]);
		if(user) user.setRoomInfo();
	}
	cb();
};