'use strict';


const TokenService = require('../../../services/TokenService');


module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};

/**
 * 验证token
 * @param token
 */
Remote.prototype.auth = function(token, cb) {
	const res = TokenService.parse(token);
	if (!res) {
		return cb(new Error('token非法'));
	}

	if (!TokenService.checkExpire(res)) {
		return cb(new Error('token过时'));
	}
	
	cb(null);
};
