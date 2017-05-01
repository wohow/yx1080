'use strict';

/**
 * 用户实例
 */
class User {

	constructor (opts) {
		this.uid = opts.uid;
		this.sid = opts.sid;
		this.ip = opts.ip;
		this.nickname = opts.nickname;
		this.headurl = opts.headurl;
		this.sex = opts.sex;
		this.gold = opts.gold || 0;// 金币
		this.roomcard = opts.roomcard || 0;// 房卡

		this.gameType = null; // 游戏
		this.gameRoomId = null; // 房间ID
	}

	// 是否在线
	isOnline () {
		return !!this.sid;
	}

	// 是否在游戏中
	isInRoom () {
		return !!this.gameType;
	}

	// 设置当前玩的游戏
	setRoomInfo (type = null, roomId = null) {
		this.gameType = type;
		this.gameRoomId = roomId;
	}

	// 包装游戏数据
	wrapGameData () {
		return {
			uid: this.uid,
			sid: this.sid,
			ip: this.ip,
			nickname: this.nickname,
			headurl: this.headurl,
			sex: this.sex,
			gold: this.gold,
		};
	}

	// 重新包装数据 用于传输
	strip () {
		return {
			uid: this.uid,
			ip: this.ip,
			nickname: this.nickname,
			headurl: this.headurl,
			sex: this.sex,
			gold: this.gold,
			roomcard: this.roomcard,

			gameType: this.gameType,
			gameRoomId: this.gameRoomId
		}
	}
}

module.exports = User;