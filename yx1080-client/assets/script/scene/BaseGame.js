
/**
*　
*/
cc.Class({
    extends: cc.Component,

    properties: {
    	roomIdTxt: cc.Label,
    	userCountTxt: cc.Label,
    	inningsTxt: cc.Label,
    },

    onLoad () {
        const roomInfo = cc.global.roomInfo;
        this.roomIdTxt.string = '房间号：'+roomInfo.id;
        this.maxInnings = roomInfo.config.inningSelect;
        let count = roomInfo.users.filter(m => !!m).length;
        this.updateUsercount(count);
        this.updateInnings(0);
        this.initOn();
        this._init();
    },

    _init () { },// 子类重写
    _close () { },// 之类重写

    initOn () {
        cc.eventMgr.on(cc.app.event.UPDATE_USERCOUNT, this.updateUsercount, this);
        cc.eventMgr.on(cc.app.event.UPDATE_INNINGS, this.updateInnings, this);
    },

    onDestroy () {
        cc.eventMgr.off(cc.app.event.UPDATE_USERCOUNT, this.updateUsercount, this);
        cc.eventMgr.off(cc.app.event.UPDATE_INNINGS, this.updateInnings, this);
        this._close();
    },

    // 刷新局数
    updateInnings (count) {
        this.inningsTxt.string = '局数：' + count + '/' + this.maxInnings;
    },

    // 刷新人数
    updateUsercount (count) {
        this.userCountTxt.string = '人数：' + count;
    },

    // 点击返回
    onClickBack () {
        cc.net.send('hall.roomHandler.exitRoom', {roomId: cc.global.roomInfo.id}, (data) => {
            if(data.code === 200){
               cc.app.loadScene('hall');
            } else {
                console.log(data.error);
            }
        });
    },

    // 点击设置
    onClickSetting () {

    },

    // 点击语音
    onClickVoice () {

    },

    // 点击聊天
    onClickChat () {

    }
});
