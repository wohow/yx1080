
const EventType = require('EventType');

/**
*　大厅
*/
cc.Class({
    extends: cc.Component,

    properties: {
    	viewNode: cc.Node,
    },

    onLoad: function () {
    	this.initViews();
    	cc.eventDispatcher.listen(EventType.OPEN_VIEW, (data)=> this.openView(data));
    },

    onDestroy: function () {
    	cc.eventDispatcher.remove(EventType.OPEN_VIEW);
    },

    // 初始化界面
    initViews: function () {
    	this.views = {};
    	let cannons = this.viewNode.getChildren();
    	for (let i = cannons.length - 1; i >= 0; i--) {
    		let node = cannons[i];
    		node.position = cc.p(0,0);
    		node.active = false;
    		this.views[node.name] = node;
    	}
    	console.log('views:', this.views);
    },

    // 打开二级界面
    openView: function (name) {
    	let view = this.views[name];
    	if (view) {
    		view.active = true;
    	}
    }

});
