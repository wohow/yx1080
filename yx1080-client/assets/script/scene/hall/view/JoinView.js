
// 加入房间
cc.Class({
    extends: require('BaseView'),

    properties: {
    	showPlates: [cc.Label],// 显示板
    },

    onClickKeyboard (event, data) {
    	console.log(data);
    }
});