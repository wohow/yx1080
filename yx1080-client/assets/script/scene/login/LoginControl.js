
/**
*　登陆
*/
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        
    },

    // 点击微信登陆
    onClickWx () {
        this.onClickGuest();
    },

    // 点击游客登陆
    onClickGuest () {
        cc.net.send('gate.accountHandler.guest', {guestid: Date.now().toString()}, (data)=> {
            if(data.code === 200){
                cc.sys.localStorage.setItem('account_uid', data.uid);
                require('loginLogic').login(data);
            } else {
                console.log(data.error);
            }
        });
    }
});
