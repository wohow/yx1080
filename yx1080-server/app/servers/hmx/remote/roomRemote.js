'use strict';

const roomMgr = require('../../../domain/hmx/RoomMgr');
const sc = require('../../../domain/StatusCode');
const cfg = require('../../../domain/hmx/config');

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};


/**
 * 创建房间
 */
Remote.prototype.createRoom = function(roomId, userData, config, cb) {
	let channel = this.app.channelService.createChannel(roomId);
	let room = roomMgr.createRoom(roomId, userData, config, channel);
	room.addUser(userData);
	cb({code: 200, room: room.strip()});
};

/**
 * 加入房间
 */
Remote.prototype.joinRoom = function(roomId, userData, cb) {
	let room = roomMgr.getRoom(roomId);
	if(!room){
		return cb({code: 500, notExist: true, error: '房间不存在'})
	}
	if(room.status !== sc.NONE){
		return cb({code: 500, error: '房间已开始'})
	}
	if(room.getUser(userData.uid)){
		return cb({code: 500, error: '已在房间里面'})
	}
	let user = room.addUser(userData);
	if(!user){
		return cb({code: 500, error: '房间已满'})
	}
	// 通知其他玩家
	room.pushMessage('onAddUser', user);
	
	// 是否满足人数 通知开始准备
	let count = room.users.filter(m => !!m).length;
	if(count === cfg.EG_COUNT){
		room.status = sc.PREPARE;
		room.pushMessage('onStartPrepare', {});// 提示玩家准备
	}

	cb({code: 200, room: room.strip()});
};

/**
 * 退出房间
 */
Remote.prototype.exitRoom = function(roomId, uid, cb) {
	let room = roomMgr.getRoom(roomId);
	if(!room){
		return cb({code: 500, error: '房间不存在'});
	}

	let user = room.getUser(uid);

	// 游戏如果已经开始了 那么就发起解散
	if(room.status !== sc.NONE){
		room.pause();// 暂停房间
		// 发起人 应该直接就是同意
		user.status = sc.AGREEDDL;
		// 通知所有人 发起了解散
		let data = room.users.map(m => m && {uid: m.uid, status: m.status});
		room.pushMessage('onRoomDlVote', data);
		return cb({code: 500, error: '发起解散'});
	}

	// 这里还要判断是否队长
	// TODO...
	cb({code: 200, isEmpty: roomMgr.exitRoom(room, uid)});
};

/**
 * 玩家离线处理
 */
Remote.prototype.leave = function(roomId, uid, cb) {
	let room = roomMgr.getRoom(roomId);
	if(!room){
		return cb(false);
	}

	// 是否开始游戏了 如果开始游戏 标记离线 
	if(room.status !== sc.NONE){
		let user = room.getUser(uid);
		if(!user) return cb(false);

		// 如果其他玩家都离线了 那么就直接解散
		let ls = room.users.filter(m => m && m.status !== sc.OFFLINE);
		if(ls.length === 1 && ls[0].uid === uid){// 解散
			room.close();
			roomMgr.removeRoom(room.id);
			cb(true);
		} else { // 标记为离线
			user.status = sc.OFFLINE;
			room.pushMessage('onExitRoom', {uid: user.uid, isOffline: true});
			cb(false);
		}
	} else { // 在准备大厅 就直接退出
		// 这里要判断队长
		// TODO...
		cb(roomMgr.exitRoom(room, uid));
	}
};