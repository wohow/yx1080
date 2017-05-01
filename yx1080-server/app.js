'use strict';

var pomelo = require('pomelo');
const RouteUtil = require('./app/utils/RouteUtil');
const init = require('./init');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'yx1080-server');

// gate
app.configure('production|development', 'gate', function() {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector,
	});
	app.route('hall', RouteUtil.invalidRoute);
	app.route('hmx', RouteUtil.invalidRoute);
});

// connector
app.configure('production|development', 'connector', function() {
	app.set('connectorConfig', {
		connector: pomelo.connectors.hybridconnector,
		heartbeat: 3,
		useDict: true,
		useProtobuf: true
	});
});

// hall
app.configure('production|development', 'hall', function() {
	init.hall(app);
});

// hmx
app.configure('production|development', 'hmx', function() {
	init.hmx(app);
});

// 初始化数据库
app.configure('production|development', 'gate|hall', function() {
	console.log('初始数据库');
});


// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});