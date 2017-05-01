
const MjEntity = require('MjEntity');

/**
*　游戏中每个玩家控制
*/
cc.Class({
    extends: cc.Component,

    properties: {
    	userInfo: require('HmxUserInfo'),
        folds: [MjEntity],// 出的牌
        holds: [cc.Node],// 手牌
        mopai: cc.Node,// 摸牌
        chupai: MjEntity,// 出牌
    },

    // 设置玩家信息
    init (data, isHomeowners) {
    	this.userInfo.init(data, isHomeowners);
    },

    empty () {
        this.userInfo.empty();
    },

    offline () {
        this.userInfo.offline();
    }

});
