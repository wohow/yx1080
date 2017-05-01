
const config = require('config');


// 登陆服务器 uid, token, server
const login = exports.login = function ({uid, token, server}) {
	// 连接游戏服务器
	cc.net.connect(server, () => {
		// 监听断开
		cc.net.onDisconnect(disconnect);
		// 进入游戏
		cc.net.send('connector.entryHandler.entry', {uid: uid, token: token}, (data)=> {
			if(data.code === 200){
				cc.global.init(data.user);
				cc.app.loadScene('hall');// 进入大厅
			} else {
				console.log(data.error);
			}
		});
	});
};


// 链接服务器
exports.connect = function() {
	cc.net.offDisconnect();
	cc.net.connect(config.server, onConnectComplete);
};

// 链接完成
const onConnectComplete = function() {

	let uid = cc.sys.localStorage.getItem("account_uid");

	if (uid) { // 如果存在 直接登陆 然后跳转大厅
		cc.net.send('gate.accountHandler.login', {uid: uid}, (data) => {
			if (data.code === 200) {
				login(data);
			} else {
				console.log(data.error);
				entryLoginScene();
			}
		});
	} else {
		entryLoginScene();
	}
};

// 进入登陆界面
const entryLoginScene = function() {
	setTimeout(() => {
		cc.director.preloadScene('login', () => {
			cc.director.loadScene('login');
		});
	}, 2000);
};

// 服务器断开
const disconnect = function() {
	console.log('服务器断开');
};