
const config = {
    lowGrade: [1, 2, 5, 10],// 低分
    inningSelect: [4, 8],// 局数
};

// 干瞪眼 创建信息
cc.Class({
    extends: cc.Component,

    properties: {
        lowGrades: [cc.Toggle],// 积分低注
        inningSelects: [cc.Toggle],// 局数选择
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
            type: 'gdy',
            lowGrade: config.lowGrade[this.getIndex(this.lowGrades)],
            inningSelect: config.inningSelect[this.getIndex(this.inningSelects)],
        };
    }
});
