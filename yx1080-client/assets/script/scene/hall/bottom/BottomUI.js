
/**
*　大厅下部UI
*/
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {

    },

    // 点击菜单
    onClickMenu: function (event, data) {
        cc.eventMgr.emit(cc.app.event.OPEN_VIEW, {name: data});
    }
});
