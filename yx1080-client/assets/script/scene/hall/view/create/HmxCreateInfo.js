
const config = {
    lowGrade: [1, 2, 3, 5, 10, 20, 50, 100],// 低分
    inningSelect: [4, 8, 16],// 局数
    playSelect: [true, false]
};

// 黄梅戏 创建信息
cc.Class({
    extends: cc.Component,

    properties: {
        lowGrades: [cc.Toggle],// 积分低注
        inningSelects: [cc.Toggle],// 局数选择
        playSelects: [cc.Toggle]// 玩法选择
    },

    getIndex (list) {
        for (let i = list.length - 1; i >= 0; i--) {
            if(list[i].isChecked)
                return i;
        }
        return 0;
    },

    getData () {
        return {
            lowGrade: config.lowGrade[this.getIndex(this.lowGrades)],
            inningSelect: config.inningSelect[this.getIndex(this.inningSelects)],
            playSelect: config.playSelect[this.getIndex(this.playSelects)],
        };
    }
});
