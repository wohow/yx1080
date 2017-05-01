'use strict';

const UserMgr = require('../../../domain/hall/UserMgr');
const RoomInfo = require('../../../domain/hall/RoomInfo');

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};


/**
 * 获取用户信息
 */
Remote.prototype.getUser = function(uid, sid, ip, cb) {

	let user = UserMgr.getUser(uid);
	if (!user) {
		user = UserMgr.createUser({
			uid: uid,
			sid: sid,
			ip: ip,
			nickname: 'u' + uid,
			headurl: '',
			sex: 0,
			gold: 100000, // 金币
			roomcard: 30 // 房卡
		});
	}

	cb(null, user.strip());
};

/**
 * 用户离线
 */
Remote.prototype.userLeave = function(uid, cb) {

	let user = UserMgr.getUser(uid);
	// 是不是在游戏
	if(user.isInRoom()){
		let roomId = user.gameRoomId;
		let server = RoomInfo.getServer(this.app, roomId);
		if(server){
			server.roomRemote.leave(null, roomId, user.uid, function (isEmpty) {
				if(isEmpty){
					RoomInfo.remove(roomId);
				}
			});
		}
	}

	// 删除
	UserMgr.removeUser(uid);
	cb(user);
};