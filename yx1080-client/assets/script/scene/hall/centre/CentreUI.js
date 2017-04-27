
const EventType = require('EventType');

/**
*　大厅中部UI
*/
cc.Class({
    extends: cc.Component,

    properties: {
        lampTxt: cc.Label,// 跑马灯
        lampRollingSpeed: 60,

        hallContent: cc.Node,// 大厅
        hmxContent: cc.Node,// 黄梅戏麻将
        gdyContent: cc.Node,// 干瞪眼
        hmxjbContent: cc.Node,// 黄梅戏麻将金币场
        curContent: 'hall',

        backNode: cc.Node,// 返回大厅按钮
    },

    onLoad: function () {
    	// cc.net.on('');
    	this.initContent();
    	this.setLamp('诚招代理，有意者请联系18223293272!!!');
    },

    onDestroy () {
    	this.unschedule(this.initLamp);
    },

    // 点击 喇叭
   	onClickHorn () {
   		// this.setLamp('这个是跑马灯啊啊啊11111');
   	},

    // 更新跑马灯信息
    setLamp (msg) {
    	this.lampTxt.string = msg;
    	this.unschedule(this.initLamp);
    	this.initLamp();
    },

    // 初始化 跑马灯
    initLamp () {
    	this.lampTxt.node.x = this.lampTxt.node.parent.width + 4;
    	this.lampEndX = -(this.lampTxt.node.width + 4);// 结束位置
    },

    // 更新跑马灯
    update: function (dt) {
    	if(!this.lampEndX)
    		return;
    	this.lampTxt.node.x -= dt*this.lampRollingSpeed;
    	if(this.lampTxt.node.x <= this.lampEndX){
    		this.lampEndX = null;
    		this.scheduleOnce(this.initLamp, 5);
    	}
    },

    // 初始化 中间内容
    initContent () {
    	this.hallContent.active = true;
    	this.hmxContent.active = false;
    	this.gdyContent.active = false;
    	this.hmxjbContent.active = false;
    },

    content () {
    	return this[this.curContent+'Content'];
    },

    // 点击中间内容
    onClickContent (event, data) {
    	this.content().active = false;
    	this.curContent = data;
    	this.content().active = true;
    	this.backNode.active = (data !== 'hall');
    },

    // 点击 房卡
    onClickRoomcar (event, data) {
    	cc.eventDispatcher.dispatch(EventType.OPEN_VIEW, {name: data, type: this.curContent});
    },

    // 点击 金币场
    onClickGoldgame (event, data) {
    	
    }

});
