
let instance = null;
module.exports = () => instance;

function alertMoveAct(color) {
    return cc.spawn(cc.moveBy(0.22, 0, 40), cc.fadeTo(0.22, color));
}

/**
 * 提示 管理类
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // 信息弹出框
        alertNode: cc.Node,
        alertMsgTxt: cc.Label,
        // 提示框
        messageBoxNode: cc.Node,
        titleTxt: cc.Label,
        contentTxt: cc.Label,
        noBtnNode: cc.Node,
    },

    onLoad: function () {
        instance = this;
        cc.game.addPersistRootNode(this.node);

        this.alertInitY = this.alertNode.y;
        this.okCallback = null;
        this.noCallback = null;
    },

    // 显示提示
    alert: function (msg) {
        this.alertNode.active = true;
        this.alertMsgTxt.string = msg || '未知错误';
        this.alertNode.y = this.alertInitY;
        this.alertNode.opacity = 0;
        this.alertNode.stopAllActions();
        let act1 = alertMoveAct(255);
        let act2 = cc.delayTime(1.3);
        let act3 = alertMoveAct(0);
        let act4 = cc.callFunc(()=> this.alertNode.active = false);
        this.alertNode.runAction(cc.sequence(act1, act2, act3, act4));
    },

    // 显示提示框 title, content, okCallback, noCallback
    showMessageBox: function (...args) {

        if(typeof args[0] !== 'string'){
            return console.error('第一个参数必须为字符串信息');
        }

        let title = '提示', content = '未知错误', okCallback, noCallback;
        if(args.length === 1){
            content = args[0];
        } 
        if(args.length >= 2){
            if(typeof args[1] === 'string'){
                title = args[0];
                content = args[1];
                okCallback = args[2];
                noCallback = args[3];
            } else if(typeof args[1] === 'function'){
                content = args[0];
                okCallback = args[1];
                noCallback = args[2];
            }
        }

        this.messageBoxNode.active = true;
        this.titleTxt.string = title;
        this.contentTxt.string = content;

        this.okCallback = okCallback;
        this.noCallback = noCallback;
        this.noBtnNode.active = !!noCallback;
    },

    onClickOk: function () {
        this.messageBoxNode.active = false;
        if(this.okCallback){
            this.okCallback();
        }
    },

    onClickNo: function () {
        this.messageBoxNode.active = false;
        if(this.noCallback){
            this.noCallback();
        }
    }
});
