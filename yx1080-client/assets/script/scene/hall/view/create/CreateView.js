
// 创建房间
cc.Class({
    extends: require('BaseView'),

    properties: {
    	hmx: require('HmxCreateInfo'),// 黄梅戏
        gdy: require('GdyCreateInfo'),// 干瞪眼
    },

    _init () {
        this.curType = 'hmx';
        this.hmx.node.active = false;
        this.gdy.node.active = false;
    },

    _open ({type}) {
        this[this.curType].node.active = false;
        this[type].node.active = true;
        this.curType = type;
    },

    // 点击创建
    onClickCreate () {
    	let data = this[this.curType].getData();
        cc.net.send('hall.roomHandler.createRoom', {type: this.curType, config: data}, (data) => {
            if(data.code === 200){
                cc.global.roomInfo = data.roomInfo;
                cc.global.seat = data.roomInfo.users.findIndex(m => m.uid === cc.global.uid);
                cc.app.loadScene(data.type+'-game');// 进入游戏
            } else {
                console.log(data.error);
            }
        });
    }
});
