
/**
*　登陆
*/
cc.Class({
    extends: cc.Component,

    properties: {
        agreementToggle: cc.Toggle,
    },

    onLoad: function () {

    },

    // 点击微信登陆
    onClickWx: function () {
        cc.app.loadScene('hall');
    }
});
