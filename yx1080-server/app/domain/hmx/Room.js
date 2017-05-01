'use strict';

const utils = require('../../utils');
const sc = require('../StatusCode');
const cfg = require('./config');


// 创建一个游戏用的 user
const newUser = function (seat, data) {
	return {
		seat: seat,
		uid: data.uid,
		ip: data.ip,
		nickname: data.nickname,
		headurl: data.headurl,
		sex: data.sex,
		status: sc.NONE,// 状态
	};
};

/**
 * 黄梅麻将 房间实例
 */
 class Room {

 	constructor (opts) {
 		this.id = opts.roomId;
		this.config = opts.config; // 游戏配置
		this.channel = opts.channel;// 
		this.homeownersUid = opts.homeownersUid;// 房主UID

		this.users = new Array(cfg.EG_COUNT).fill(null); // 玩家列表
		this.status = sc.NONE; // 状态

		this.zhuangIdx = 0;// 庄家位置
		this.currInnings = 0;// 当前局数
 	}

 	// 添加一个用户
 	addUser (user) {
 		let i = this.users.findIndex(m => !m);
 		if(i !== -1){
	 		this.users[i] = newUser(i, user);
	 		this.channel.add(user.uid, user.sid);
	 		return this.users[i];
 		}
 		return null;
 	}

 	getUser (uid) {
 		return this.users.find((m)=> m && m.uid === uid);
 	}

 	removeUser (uid) {
 		let i = this.users.findIndex(m => m.uid === uid);
 		if(i !== -1){
 			this.channel.leave(this.users[i].uid, this.users[i].sid);
 			this.users[i] = null;
 		}
 	}

 	// 初始化游戏数据
 	init () {
 		// 设置所有玩家状态
 		
 		// 第一局随机一个庄家出来
 		if(this.currInnings === 0){
 			this.zhuangIdx = utils.random(0, this.users.length-1);
 		}
 		++this.currInnings;
 	}

 	// 关闭房间
 	close () {
 		this.channel.destroy();
 	}

 	// 暂定
 	pause () {

 	}

 	// 恢复
 	resume () {

 	}

 	// 推送消息
 	pushMessage (route, msg) {
 		this.channel.pushMessage(route, msg);
 	}

 	// 包装游戏数据
 	wrapGameData () {
 		return {
 			zhuangIdx: this.zhuangIdx,
 			currInnings: this.currInnings
 		};
 	}

	strip () {
		return {
			id: this.id,
			config: this.config,
			homeownersUid: this.homeownersUid,
			users: this.users,
			status: this.status,
		};
	}
 }

 module.exports = Room;