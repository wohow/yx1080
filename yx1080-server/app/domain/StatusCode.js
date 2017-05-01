'use strict';

/**
 * 所有状态码
 */
module.exports = {

	NONE: 'NONE',
	INGAME: 'INGAME', // 游戏中
	PREPARE: 'PREPARE', // 准备
	READY: 'READY', // 准备好了
	OFFLINE: 'OFFLINE', // 离线
	AGREEDDL: 'AGREEDDL',// 同意解散
	NOTAGREEDDL: 'NOTAGREEDDL',// 不同意解散
};