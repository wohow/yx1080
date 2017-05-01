
cc.macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL = 0;

let isInit = false;

/**
*　入口
*/
cc.Class({
    extends: cc.Component,

    properties: {
        status: cc.Label,
    },

    start () {
        this.schedule(this.updateLoadingDot, 0.5);
        if(!isInit){
            this.setStatusMsg('拼命加载中');
            this.initConfig();
            // 检查更新

            // 加载资源
            cc.assetsMgr.init(this.onLoadComplete.bind(this));
        } else {
            this.onLoadComplete();
        }
    },

    // 初始化 配置
    initConfig () {
        cc.app = {};
        // 场景管理
        cc.app.loadScene = require('SceneMgr').load;
        // 提示框
        const tip = require('TipMgr')();
        cc.app.alert = tip.alert.bind(tip);
        cc.app.showMessageBox = tip.showMessageBox.bind(tip);
        // 对象池
        const pool = require('ObjectPool');
        cc.createNode = pool.create;
        cc.destroyNode = pool.destroy;
        // 资源管理
        cc.assetsMgr = require('AssetsMgr')();
        // 音频管理
        cc.audioMgr = require('AudioMgr');
        cc.audioMgr.init();
        // 全局数据
        cc.global = require('Global');
        // 事件
        cc.eventMgr = require('EventDispatcher');
        cc.app.event = require('EventType');
        // 网络
        cc.net = require('net');
        // 工具库
        cc.utils = require('utils');
        isInit = true;
    },

    // 加载完成 链接服务器
    onLoadComplete () {
        this.setStatusMsg('连接服务器中');
        require('loginLogic').connect();
    },

    // 刷新状态显示
    setStatusMsg (msg) {
        this.loadingDot = '';
        this.loadingMsg = msg;
        this.status.string = this.loadingMsg;
    },

    updateLoadingDot () {
        this.loadingDot += '.';
        if(this.loadingDot === '....') 
            this.loadingDot = '';
        this.status.string = this.loadingMsg + this.loadingDot;
    },

});
