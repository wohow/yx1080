
const EventType = require('EventType');

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
        cc.eventDispatcher.dispatch(EventType.OPEN_VIEW, data);
    }
});
