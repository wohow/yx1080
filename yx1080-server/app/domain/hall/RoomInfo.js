'use strict';

const utils = require('../../utils');

/**
 * 大厅管理的 所有游戏的房间
 * 生成房间ID 方便只需要通过房间ID就能 进入到答应游戏
 */

let rooms = {};// roomId,type,userId


// 添加一个房间
exports.add = function (roomId, type, uid) {
	let room = {
		roomId: roomId,
		type: type,
		uid: uid
	};
	rooms[roomId] = room;
};

// 获取游戏信息
exports.get = function (roomId) {
	return rooms[roomId];
};

// 获取服务器
exports.getServer = function (app, roomId) {
	let room = rooms[roomId];
	return room ? app.rpc[room.type] : null;
};

// 删除
exports.remove = function (roomId) {
	delete rooms[roomId];
};

// 是否有重复的房间ID
const isRepeat = function (roomId) {
	return !!rooms[roomId];
};

// 生成房间ID
exports.generateRoomId = function () {
	let roomId;
	do {
		roomId = utils.randomId(6);
	} while (isRepeat(roomId));
	return roomId;
};


// debug打印
exports.debug = function () {
	setInterval(print, 60000);
};
const print = function () {
	for (let key in rooms) {
		console.log(rooms[key]);
	}
};