
let instance = null;
exports.wait = (isOpen) => instance.wait(isOpen);

/**
 * 网络等待
 */
cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Node,
        bg: cc.Node
    },

    onLoad: function () {
        instance = this;
        cc.game.addPersistRootNode(this.node);
        this.mask.on(cc.Node.EventType.TOUCH_START, (event) => event.stopPropagation());
    },

    wait: function (isOpen) {
        this.unscheduleAllCallbacks();
        if(isOpen){
            this.mask.active = true;
            this.scheduleOnce(()=> this.bg.active = true, 1.5);
        } else {
            this.mask.active = false;
            this.bg.active = false;
        }
    },
});

