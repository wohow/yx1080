'use strict';


/**
 * 无效的路由 如果有个两个以上forntend服务器的时候
 * 就容易出现绕过某个forntend
 */
exports.invalidRoute = function (session, msg, app, cb) {
	cb(new Error('route from gate is invalid'));
};
