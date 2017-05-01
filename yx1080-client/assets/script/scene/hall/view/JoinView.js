
// 加入房间
cc.Class({
    extends: require('BaseView'),

    properties: {
    	showPlates: [cc.Label],// 显示板
    },

    _init () {
    	this.index = 0;
    	this.showPlates.forEach((m) => m.string = '');
    },

    _open () {
    	this._init();
    },

    onClickKeyboard (event, data) {
    	if(data === 'reset'){
            this.index = 0;
            this.showPlates.forEach((m) => this.animation(m, ''));
    	} else if(data === 'remove'){
    		let i = this.index = Math.max(this.index - 1, 0);
    		this.animation(this.showPlates[i], '');
    	} else if(this.index < this.showPlates.length){
    		this.animation(this.showPlates[this.index++], data);
  			if(this.index >= this.showPlates.length){
  				this.onApplyJoin();
  			}
    	}
    },

    // 一个小动画
    animation (label, msg) {
    	label.node.stopAllActions();
    	if(msg === ''){
    		label.node.runAction(cc.sequence(
	    		cc.fadeTo(0.2, 0),
	    		cc.callFunc(()=> label.string = msg),
	    	));
    	} else {
    		label.string = msg;
    		label.node.opacity = 0;
    		label.node.runAction(cc.fadeTo(0.4, 255));
    	}
    },

    // 申请 加入
    onApplyJoin () {
    	let number = this.showPlates.reduce((acc, val) => acc + val.string, '');
        cc.net.send('hall.roomHandler.joinRoom', {roomId: number}, (data) => {
            if(data.code === 200){
                cc.global.roomInfo = data.roomInfo;
                cc.global.seat = data.roomInfo.users.findIndex(m => m && m.uid === cc.global.uid);
                cc.app.loadScene(data.type+'-game');// 进入游戏
            } else {
                console.log(data.error);
            }
        });
    }

});