
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
                cc.utils.addEventHandler(button, this, 'onClose');
            } else {
                console.error(this.node.name, '界面close上没有Button属性');
            }
        }
        this._init();
    },

    // 打开函数
    open (data) {
        this.node.active = true;
        this._open(data);
    },

    // 关闭
    onClose () {
        this.node.active = false;
        this._close();
    },

    ////////////////////////下面是子类可以重写的函数//////////////////////////////

    _init () { },// 界面第一次初始化的时候调用 
    _open (data) { }, // 每次打开界面的时候调用 可以有参数 子类重写的时候最好用 解构参数
    _close () { } // 当界面关闭的时候调用

});
