
let isInitConfig = false;

/**
*　入口
*/
cc.Class({
    extends: cc.Component,

    properties: {
        status: cc.Label,
        nextScene: 'login',
    },

    start () {
        this.updateStatusShow('连接服务器中...');
        if(!isInitConfig){
            this.initConfig();
        }

        // 预加载初始场景 然后进入主场景
        cc.director.preloadScene(this.nextScene, ()=> {
            this.enterMainScene();
        });
    },

    // 初始化 配置
    initConfig () {
        isInitConfig = true;
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
        cc.eventDispatcher = require('EventDispatcher');
        // 网络
        cc.net = require('net');
    },

    // 加载资源
    loadAssets () {

    },

    // 进入主场景
    enterMainScene () {
        setTimeout(()=>{
            cc.director.loadScene(this.nextScene)
        }, 1000);
    },

    // 刷新状态显示
    updateStatusShow (msg) {
        this.status.string = msg;
    }
});
