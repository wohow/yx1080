'use strict';

const roomMgr = require('../../../domain/hmx/RoomMgr');
const sc = require('../../../domain/StatusCode');
const cfg = require('../../../domain/hmx/config');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

/**
 * 准备
 * @param roomId
 */
Handler.prototype.ready = function(msg, session, next) {

	let room = roomMgr.getRoom(msg.roomId);
	if(!room){
		return next(new Error('房间不存在'));
	}

	let user = room.getUser(session.uid);
	if(!user){
		return next(new Error('不在房间'));
	}

	// 直接设置 为准备
	user.status = sc.READY;
	next(null);

	// 是不是都准备好了
	if(room.users.every(m => m && m && m.status === sc.READY)){
		room.status = sc.INGAME;
		room.init();
		room.pushMessage('onStartGame', room.wrapGameData());
	}
};

/**
 * 同意解散
 * @param roomId status
 */
Handler.prototype.agreedDl = function(msg, session, next) {

	let room = roomMgr.getRoom(msg.roomId);
	if(!room){
		return next(new Error('房间不存在'));
	}

	let user = room.getUser(session.uid);
	if(!user){
		return next(new Error('不在房间'));
	}

	// 直接设置 为同意
	user.status = msg.status;
	next(null);

	// 通知 投票
	let data = room.users.map(m => m && {uid: m.uid, status: m.status});
	room.pushMessage('onRoomDlVote', data);

	// 是不是都投票了
	let agreeCount = room.users.filter(m => m && m.status === sc.AGREEDDL).length;
	let notagreeCount = room.users.filter(m => m && m.status === sc.NOTAGREEDDL).length;
	let onlineCount = room.users.filter(m => m && m.status !== sc.OFFLINE).length;
	if(agreeCount + notagreeCount === onlineCount){
		
		setTimeout(()=> {// 这里可以延迟 发送

			if(notagreeCount === 0){ // 解散
				let users = room.users.map(m => m && m.uid);
				this.app.rpc.hall.roomRemote.removeRoom(null, room.id, users, function(){
					room.close();
					roomMgr.removeRoom(room.id);
					room.pushMessage('onRoomDlVoteResult', true);
				});
			} else { // 不解散
				room.resume();// 恢复游戏
				room.pushMessage('onRoomDlVoteResult', false);
			}

		}, 1000);
	}
};