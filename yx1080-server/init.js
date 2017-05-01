'use strict';

// 大厅 服务器
exports.hall = app => {

	if(app.get('env') === 'development'){
		require('./app/domain/hall/RoomInfo').debug();
    }
};

// 黄梅麻将 服务器
exports.hmx = app => {


};

// 干瞪眼 服务器
exports.gdy = app => {


};