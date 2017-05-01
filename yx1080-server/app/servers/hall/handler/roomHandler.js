'use strict';

const UserMgr = require('../../../domain/hall/UserMgr');
const RoomInfo = require('../../../domain/hall/RoomInfo');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

/**
 * 创建房间
 * @param type, config
 */
Handler.prototype.createRoom = function(msg, session, next) {

	let {type, config} = msg;
	let user = UserMgr.getUser(session.uid);
	
	if(user.isInRoom()){
		return next(null, {code: 500, error: '已经在房间中'});
	}

	let server = this.app.rpc[type];
	if(!server){
		return next(null, {code: 500, error: '游戏不存在'});
	}

	// 生成房间ID
	let roomId = RoomInfo.generateRoomId();
	// 执行创建房间
	server.roomRemote.createRoom(null, roomId, user.wrapGameData(), config, function(data){
		if(data.code === 200){
			user.setRoomInfo(type, roomId);
			RoomInfo.add(roomId, type, user.uid);
			next(null, {code: 200, type: type, roomInfo: data.room});
		} else {
			next(null, {code: 500, error: data.error});
		}
	});
};

/**
 * 加入房间
 * @param roomId
 */
Handler.prototype.joinRoom = function(msg, session, next) {

	let roomId = msg.roomId;
	let user = UserMgr.getUser(session.uid);
	if(user.isInRoom()){
		return next(null, {code: 500, error: '已经在房间中'});
	}

	let room = RoomInfo.get(roomId);
	if(!room){
		return next(null, {code: 500, error: '房间不存在'});
	}
	let server = this.app.rpc[room.type];
	if(!server){
		return next(null, {code: 500, error: '房间不存在'});
	}

	// 加入房间
	server.roomRemote.joinRoom(null, roomId, user.wrapGameData(), function(data) {
		if(data.code === 200){
			user.setRoomInfo(room.type, roomId);
			next(null, {code: 200, type: room.type, roomInfo: data.room});
		} else {
			if(data.notExist){
				RoomInfo.remove(roomId);
			}
			next(null, {code: 500, error: data.error});
		}
	});
};


/**
 * 退出房间 只有游戏还没有开始才能退出
 * @param roomId
 */
Handler.prototype.exitRoom = function(msg, session, next) {

	let roomId = msg.roomId;
	let user = UserMgr.getUser(session.uid);

	if(!user.isInRoom()){
		return next(null, {code: 500, error: '你还没有加入房间'});
	}

	let server = RoomInfo.getServer(this.app, roomId);
	if(!server){
		return next(null, {code: 500, error: '房间不存在'});
	}

	// 请求游戏服务器 退出房间
	server.roomRemote.exitRoom(null, roomId, user.uid, function (data) {
		if(data.code === 200){
			user.setRoomInfo();
			if(data.isEmpty){
				RoomInfo.remove(roomId);
			}
			next(null, {code: 200});
		} else {
			next(null, {code: 500, error: data.error});
		}
	});
};

