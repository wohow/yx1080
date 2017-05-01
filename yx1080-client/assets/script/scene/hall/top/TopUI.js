
/**
*　大厅上部UI
*/
cc.Class({
    extends: cc.Component,

    properties: {
        headimg: cc.Sprite,// 头像
        nicknameTxt: cc.Label,
        goldTxt: cc.Label,
        roomcarTxt: cc.Label
    },

    onLoad: function () {
        cc.assetsMgr.setHeadimg(this.headimg);
        this.nicknameTxt.string = cc.global.nickname;
        this.goldTxt.string = cc.global.gold;
        this.roomcarTxt.string = cc.global.roomcard;
    },

    // 点击菜单
    onClickMenu: function (event, data) {
        cc.eventMgr.emit(cc.app.event.OPEN_VIEW, {name: data});
    },

    // 点击购买
    onClickBuy: function (event, data) {

    }
});
