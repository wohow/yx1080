'use strict';

const pomelo = require('pomelo');

/**
 *  服务器分发
 */
exports.dispatch = function(uid, type = 'connector') {
	let connectors = pomelo.app.getServersByType(type);
	if(!connectors || connectors.length === 0) {
		return false;
	}
	let index = Math.abs(uid) % connectors.length;
	return connectors[index];
};
