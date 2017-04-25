
/**
*　入口
*/
cc.Class({
    extends: cc.Component,

    properties: {
        status: cc.Label,
        nextScene: 'login',
    },

    start: function () {
        this.updateStatusShow('连接服务器中...');

        this.initConfig();

        // 预加载初始场景 然后进入主场景
        cc.director.preloadScene(this.nextScene, ()=> {
            this.enterMainScene();
        });
    },

    initConfig: function () {
        cc.app = {};
        // 场景管理
        cc.app.loadScene = require('SceneMgr').load;
        // 全局数据
        cc.global = require('Global');
        // 事件
        cc.eventDispatcher = require('EventDispatcher');
        // 网络
        cc.net = require('net');
    },

    // 进入主场景
    enterMainScene: function () {
        setTimeout(()=>{
            cc.director.loadScene(this.nextScene)
        }, 1000);
    },

    // 刷新状态显示
    updateStatusShow: function (msg) {
        this.status.string = msg;
    }
});
