
let instance = null;
exports.wait = (isOpen) => instance.wait(isOpen);

/**
 * 网络等待
 */
cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Node,
        bg: cc.Node,
        loading: cc.Animation,
    },

    onLoad () {
        instance = this;
        cc.game.addPersistRootNode(this.node);
        this.mask.on(cc.Node.EventType.TOUCH_START, (event) => event.stopPropagation());
    },

    wait (isOpen) {
        this.unscheduleAllCallbacks();
        if(isOpen){
            this.mask.active = true;
            this.scheduleOnce(()=> {
                this.bg.active = true;
                this.loading.play();
            }, 1.5);
        } else {
            this.loading.stop();
            this.mask.active = false;
            this.bg.active = false;
        }
    },
});

