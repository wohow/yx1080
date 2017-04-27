
// 阻止 点击事件穿透
cc.Class({
    extends: cc.Component,

    onEnable: function () {
        this.node.on('mousedown', this.callback);
        this.node.on(cc.Node.EventType.TOUCH_START, this.callback);
    },

    onDisable: function () {
        this.node.off('mousedown', this.callback);
        this.node.off(cc.Node.EventType.TOUCH_START, this.callback);
    },

    callback: function (event) {
        event.stopPropagation();
    }
});
