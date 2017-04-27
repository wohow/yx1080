
let instance = null;
module.exports = () => instance;

/**
*　资源管理中心 
*  一些需要快捷的全局资源可以放到这里
*/
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        instance = this;
        cc.game.addPersistRootNode(this.node);
    },
});
