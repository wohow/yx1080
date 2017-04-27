
const EventType = require('EventType');

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

    },

    // 点击菜单
    onClickMenu: function (event, data) {
        cc.eventDispatcher.dispatch(EventType.OPEN_VIEW, {name: data});
    },

    // 点击购买
    onClickBuy: function (event, data) {

    }
});
