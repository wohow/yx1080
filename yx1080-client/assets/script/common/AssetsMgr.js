
let instance = null;
module.exports = () => instance;

const preloadLoadConfig = [
	{ name: 'font', url: 'font'}, // 字体
];


/**
*　资源管理中心 
*  一些需要快捷的全局资源可以放到这里
*/
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        instance = this;
        cc.game.addPersistRootNode(this.node);
    },

    init (cb) {

    	let totalCount = preloadLoadConfig.length, completeCount = 0;
    	if(totalCount === 0 && cb){
    		return cb();
    	}
    	
    	const next = (name, assets) => {
    		console.log(name, 'load complete.');
    		// 处理对应逻辑

    		// 判断是否加载完成
			if(++completeCount >= totalCount && cb){
				console.log('all complete!');
                cb();
			}
		};

		for (let i = preloadLoadConfig.length - 1; i >= 0; i--) {
			(function(config){
				cc.loader.loadResDir(config.url, function (err, assets) {
				    next(config.name, assets);
				});
			}(preloadLoadConfig[i]));
		}
    },

    // 设置头像
    setHeadimg (headimg, url) {
        url = url || cc.global.headurl;
        
    },

    // 获取麻将图片
    getMjImg (id) {
        
    }


});
