
/**
*　一个麻将
*/
cc.Class({
    extends: cc.Component,

    properties: {
    	img: cc.Sprite,
    },

    init (id) {
    	this.id = id;
    	this.img.spriteFrame = cc.assetsMgr.getMjImg(id);
    }
});
