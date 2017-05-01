
const HmxUserControl = require('HmxUserControl');
const YXUtils = require('YXUtils');

/**
*　黄梅麻将 游戏大厅
*/
cc.Class({
    extends: cc.Component,

    properties: {
    	arrowNode: cc.Node,
    	arrows: [cc.Toggle],// 指示器
    	countdownTxt: cc.Label,// 倒计时
    	surpluscountTxt: cc.Label,// 剩余张数

    	users: [HmxUserControl],// 四个玩家
    },

    // 初始化游戏
    init () {
        this.node.active = true;

        const list = cc.global.roomInfo.users;
        const homeownersUid = cc.global.roomInfo.homeownersUid;
        // 重新排列
        YXUtils.afreshArrangeSeat(this.users, cc.global.seat);
        for (let i = list.length - 1; i >= 0; i--) {
            let user = list[i];
            if(!user) continue;
            this.users[user.seat].init(user, homeownersUid === user.uid);
        }
        // 设置指示器
        const gameInfo = cc.global.gameInfo;
        this.arrows[gameInfo.zhuangIdx].isChecked = true;
        this.arrowNode.rotation = -90 * (4-cc.global.seat);// 让指示器 东指向位置0的玩家
        // 初始化牌

        // 刷新局数
        cc.eventMgr.emit(cc.app.event.UPDATE_INNINGS, gameInfo.currInnings);

        this.initOn();
    },

    initOn () {
        cc.net.on('onExitRoom', this.onExitRoom, this);
    },

    onDisable () {
        cc.net.off('onExitRoom', this);
    },

    // 有玩家退出
    onExitRoom (data) {
        let user = this.users.find(m => m && m.userInfo.uid === data.uid);
        if(!user) return;
        user = user.userInfo;
        cc.global.roomInfo.users[user.seat].status = 'OFFLINE';
        user.offline();
    }

});
