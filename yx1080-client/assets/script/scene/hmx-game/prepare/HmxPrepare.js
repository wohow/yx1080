const HmxUserInfo = require('HmxUserInfo');
const YXUtils = require('YXUtils');

/**
 *　黄梅麻将 准备大厅
 */
cc.Class({
    extends: cc.Component,

    properties: {
        users: [HmxUserInfo],
    },

    init() {
        this.node.active = true;
        const list = cc.global.roomInfo.users;
        const homeownersUid = cc.global.roomInfo.homeownersUid;
        // 重新排列
        YXUtils.afreshArrangeSeat(this.users, cc.global.seat);        
        for (let i = list.length - 1; i >= 0; i--) {
            let user = list[i];
            if(!user) continue;
            this.users[user.seat].init(user, homeownersUid === user.uid);
        }
        // 是不是开始准备了
        if(cc.global.roomInfo.status === 'PREPARE'){
            this.ready();
        }
        
        // 监听
        cc.net.on('onAddUser', this.onAddUser, this);
        cc.net.on('onStartPrepare', this.onStartPrepare, this);
        cc.net.on('onExitRoom', this.onExitRoom, this);
    },

    close() {
        cc.net.off('onAddUser', this);
        cc.net.off('onStartPrepare', this);
        cc.net.off('onExitRoom', this);
        this.node.active = false;
    },

    // 有玩家加入
    onAddUser(data) {
        if (data.uid === cc.global.uid)
            return;
        const homeownersUid = cc.global.roomInfo.homeownersUid;
        cc.global.roomInfo.users[data.seat] = data;
        this.users[data.seat].init(data, homeownersUid === data.uid);
        this.updateUsercount();
    },

    // 提示准备
    onStartPrepare(data) {
        cc.global.roomInfo.status = 'PREPARE';
        this.ready();
    },
  
    // 准备
    ready() {
        cc.net.send('hmx.mainHandler.ready', { roomId: cc.global.roomInfo.id });
    },

    // 有玩家退出
    onExitRoom(data) {
        let user = this.users.find(m => m && m.uid === data.uid);
        if(!user) return;
        if(data.isOffline){
            cc.global.roomInfo.users[user.seat].status = 'OFFLINE';
            user.offline();
        } else {
            cc.global.roomInfo.users[user.seat] = null;
            user.empty();
            this.updateUsercount();
        }
    },


    // 刷新人数
    updateUsercount () {
        let count = cc.global.roomInfo.users.filter(m => !!m).length;
        cc.eventMgr.emit(cc.app.event.UPDATE_USERCOUNT, count);
    },

    // 点击邀请微信好友
    onClickWxInviteFriend() {

    },
});