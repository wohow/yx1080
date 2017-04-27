
/**
 * 音频管理中心
 */
module.exports = {

	bgmVolume: 1.0,// 背景音乐 音量
    sfxVolume: 1.0,// 特效音乐 音量
    
    bgmAudioID: -1,// 背景音乐 ID

    init: function () {
        let bgmV = cc.sys.localStorage.getItem("bgmVolume");
        if(bgmV !== null){
            this.bgmVolume = parseFloat(bgmV);
        }
        let sfxV = cc.sys.localStorage.getItem("sfxVolume");
        if(sfxV !== null){
            this.sfxVolume = parseFloat(sfxV);    
        }
        console.log('bgmVolume:', this.bgmVolume, ' sfxVolume:', this.sfxVolume);

        // 界面退出到后台
        cc.game.on(cc.game.EVENT_HIDE, function () {
            // console.log('cc.audioEngine.pauseAll');
            cc.audioEngine.pauseAll();
        });
        // 界面从后台显示出来
        cc.game.on(cc.game.EVENT_SHOW, function () {
            // console.log('cc.audioEngine.resumeAll');
            cc.audioEngine.resumeAll();
        });
    },
    
    getUrl: function (url) {
        return cc.url.raw('resources/sounds/' + url);
    },
    
    // 播放背景
    playBGM: function (url) {
        var audioUrl = this.getUrl(url);
        console.log(audioUrl);
        if(this.bgmAudioID >= 0){
            cc.audioEngine.stop(this.bgmAudioID);
        }
        this.bgmAudioID = cc.audioEngine.play(audioUrl,true,this.bgmVolume);
    },
    
    // 播放特效
    playSFX: function (url) {
        var audioUrl = this.getUrl(url);
        if(this.sfxVolume > 0){
            var audioId = cc.audioEngine.play(audioUrl,false,this.sfxVolume);    
        }
    },
    
    // 设置特效 音量
    setSFXVolume: function (v) {
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem('sfxVolume', v);
            this.sfxVolume = v;
        }
    },
    
    // 设置背景 音量
    setBGMVolume: function (v, force) {
        if(this.bgmAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else{
                cc.audioEngine.pause(this.bgmAudioID);
            }
            //cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);
        }
        if(this.bgmVolume != v || force){
            cc.sys.localStorage.setItem('bgmVolume', v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID,v);
        }
    },
    
    // 暂停
    pauseAll: function () {
        cc.audioEngine.pauseAll();
    },
    
    // 恢复
    resumeAll: function () {
        cc.audioEngine.resumeAll();
    }

};
