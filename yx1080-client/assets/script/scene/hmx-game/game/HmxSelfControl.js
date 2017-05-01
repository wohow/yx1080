
/**
*　
*/
cc.Class({
    extends: require('HmxUserControl'),

    properties: {
    	currSelectMj: null, // 当前选择的麻将
    },

    start () {
    	// 添加事件
    	const addEvent = (node) => {
    		let button = node.getComponent(cc.Button);
    		let entity = node.getComponent('MjEntity');
    		cc.utils.addEventHandler(button, this, 'onClickPai', entity);
    	};
    	for (let i = this.holds.length - 1; i >= 0; i--) {
    		addEvent(this.holds[i]);
    	}
    	addEvent(this.mopai);
    },

    // 点击牌 #81F0FF
    onClickPai (event, data) {
    	if(this.currSelectMj === data){ // 点击第二次 出牌
    		console.log('出牌', data.id);
    	} else {
    		if(this.currSelectMj){
	    		this.currSelectMj.node.runAction(cc.moveBy(0.1, 0, -30));
	    	}
	    	data.node.runAction(cc.moveBy(0.1, 0, 30));
	    	this.currSelectMj = data;
    	}
    }

});
