
const utils = require('utils');

// 所有UI 父类
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        let bg = this.node.getChildByName('bg');
        bg.on(cc.Node.EventType.TOUCH_START, (event)=> event.stopPropagation());
        let close = bg.getChildByName('close');
        if(close){
            let button = close.getComponent(cc.Button);
            if(button){
                button.clickEvents = [];
                utils.addEventHandler(button, this, 'onClose');
            } else {
                console.error(this.node.name, '界面close上没有Button属性');
            }
        }
        this._init();
    },

    _init () { },// 子类重写

    // 打开函数
    open (data) {
        this.node.active = true;
        this._open(data);
    },

    _open (data) { }, // 子类重写

    // 关闭
    onClose () {
        this.node.active = false;
        this._close();
    },

    _close () { } // 子类重写

});
