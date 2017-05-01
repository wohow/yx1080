/**
 *　黄梅麻将游戏
 */
cc.Class({
    extends: require('BaseGame'),

    properties: {
        prepare: require('HmxPrepare'),
        game: require('HmxGame')
    },

    _init() {
        this.prepare.node.active = true;
        this.game.node.active = false;
    },

    start () {
        this.prepare.init();
        cc.net.on('onStartGame', this.onStartGame, this);
        cc.net.on('onRoomDlVote', this.onRoomDlVote, this);
        cc.net.on('onRoomDlVoteResult', this.onRoomDlVoteResult, this);
    },

    onDestroy () {
        cc.net.off('onStartGame', this);
    },

    // 开始游戏
    onStartGame (data) {
        cc.global.roomInfo.status = 'INGAME';
        cc.global.gameInfo = data;
        this.prepare.close();
        this.game.init();
    },

    // 发起解散
    onRoomDlVote (data) {
        console.log('onRoomDlVote', data);
    },

    // 解散 投票结果
    onRoomDlVoteResult (data) {
        console.log('onRoomDlVoteResult', data);
    }
});