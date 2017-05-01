'use strict';

const crypto = require('crypto');


const config = {
	secret: '12312312412142121', 
	expire: -1
};


/**
 * 创建token
 * 
 * @param  {String} uid
 * @return {String} token string
 */
exports.create = function(uid) {
	var msg = uid + '|' + Date.now();
	var cipher = crypto.createCipher('aes256', config.secret);
	var enc = cipher.update(msg, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
};

/**
 * 解析token
 * 
 * @param  {String} token
 * @return {Object} {uid, timestamp}
 */
exports.parse = function(token) {
	var decipher = crypto.createDecipher('aes256', config.secret);
	var dec;
	try {
		dec = decipher.update(token, 'hex', 'utf8');
		dec += decipher.final('utf8');
	} catch(err) {
		console.error('[token] fail to decrypt token. %j', token);
		return null;
	}
	var ts = dec.split('|');
	if(ts.length !== 2) {
		console.error('illegal token', dec);
		return null;
	}
	return {uid: ts[0], timestamp: Number(ts[1])};
};

/**
 * 检查是否过期
 * 
 * @param  {String} {uid, timestamp}
 * @return {boolean} 
 */
exports.checkExpire = function (token) {
	if(config.expire < 0) {
		return true;
	}
	return (Date.now() - token.timestamp) < config.expire;
}
