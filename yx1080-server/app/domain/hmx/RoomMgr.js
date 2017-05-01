'use strict';

const Room = require('./Room');

/**
 * 黄梅麻将 房间管理中心
 */

let rooms = {};

// 创建房间
exports.createRoom = function(roomId, user, config, channel) {

	let room = new Room({
		roomId: roomId,
		config: config,
		channel: channel,
		homeownersUid: user.uid,
	});
	rooms[roomId] = room;
	return room;
};

// 获取房间
exports.getRoom = function (roomId) {
	return rooms[roomId];
};

// 删除房间
const removeRoom = exports.removeRoom = function (roomId) {
	delete rooms[roomId];
	console.log(roomId, '房间解散');
};

// 退出房间
exports.exitRoom = function (room, uid) {
	// 删除玩家
	room.removeUser(uid);
	// 如果里面没有玩家了 那么就解散房间
	if(room.users.every(m => m === null)){
		room.close();
		removeRoom(room.id);
		return true;
	} else {
		room.pushMessage('onExitRoom', {uid: uid, isOffline: false});// 通知其他玩家 有人退出
		return false;
	}
}