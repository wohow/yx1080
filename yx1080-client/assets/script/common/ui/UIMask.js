
// UI遮罩层
cc.Class({
    extends: cc.Component,

    properties: {
        clickClose: true // 点击是否关闭UI
    },

    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, (event)=> {
            event.stopPropagation();
            if(this.clickClose){
                this.node.parent.active = false;
            }
        });
    }
});
