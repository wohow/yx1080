
/**
*　准备阶段时候 玩家信息
*/
cc.Class({
    extends: cc.Component,

    properties: {
    	headimgNode: cc.Node,
    	headimgSpr: cc.Sprite,// 头像精灵
    	nicknameTxt: cc.Label,// 昵称
        homeownersNode: cc.Node,// 房主
        offlineNode: cc.Node,// 离线标识

    	scoreTxt: cc.Label,// 分数
    },

    // 初始化信息 
    init ({uid, seat, headurl, nickname}, isHomeowners) {
        this.uid = uid;
        this.seat = seat;
        cc.assetsMgr.setHeadimg(this.headimgSpr, headurl);
        this.nicknameTxt.string = nickname;
    	this.headimgNode.active = true;

        this.offlineNode.active = false;
        this.homeownersNode.active = isHomeowners;
    },
    
    // 清空
    empty () {
        this.uid = null;
        this.seat = null;
        this.nicknameTxt.string = '待加入';
        this.headimgNode.active = false;
        this.offlineNode.active = false;
        this.homeownersNode.active = false;
    },

    // 离线
    offline () {
        this.offlineNode.active = true;
    },

    // 设置分数
    setScore (score) {
    	this.scoreTxt.string = score;
    }

});
