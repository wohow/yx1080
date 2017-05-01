
/**
 * xy游戏 工具类
 */

// 重新排列玩家位置 0下 1右 2上 3左
exports.afreshArrangeSeat = function (list, seat) {
    let copy = list.slice();
    for (let i = 0; i < copy.length; i++) {
        list[seat] = copy[i];
        if(++seat >= copy.length){
            seat = 0;
        }
    }
};