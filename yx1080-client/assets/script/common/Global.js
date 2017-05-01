
/**
*　全局变量
*/
const self = module.exports = {

	init: function (data) {
		console.log(data);
		self.uid = data.uid;// 玩家唯一ID
		self.ip = data.ip;// IP地址
		self.nickname = data.nickname;
		self.headurl = data.headurl;
		self.sex = data.sex;
		self.gold = data.gold;// 金币
		self.roomcard = data.roomcard;// 房卡
	},


	roomInfo: // 房间信息
	{
		id: '',
		config: null, // 游戏配置
		homeownersUid: '', // 房主UID
		users: [],
		status: '',
	},

	gameInfo: // 游戏信息
	{
	},

	seat: 0,// 当前自己在游戏中的座位
};