

// 单列
let instance = null;

// 对象池
cc.Class({
    extends: cc.Component,

    properties: {
        debugTxt: cc.RichText,// debug显示
        objects: [cc.Prefab],// 需要进行复用的对象
    },

    onLoad: function () {
        instance = this;
        cc.game.addPersistRootNode(this.node);
        if(this.debugTxt){
            this.debugTxt.node.parent.active = false;
        }
        this.prefabs = {};
        this.allInstances = {};
        for (var i = this.objects.length - 1; i >= 0; i--) {
            var obj = this.objects[i];
            if(!obj)
                continue;
            this.prefabs[obj.name] = obj;
            this.allInstances[obj.name] = [];
        }
    },

    get: function (objName) {
        var pool = this.allInstances[objName];
        if(!pool){
            return null;
        }
        var arr = pool.filter((m)=> !m.parent);
        if(arr.length > 0){
            return arr[0];
        } else {
            return this.createNode(objName);
        }
    },

    createNode: function (objName) {
        var prefab = this.prefabs[objName];
        var node = cc.instantiate(prefab);
        this.allInstances[objName].push(node);
        return node;
    },

    // 打印大小
    showDebug: function () {
        var msg = '', ls, maxCount, useCount;
        for (var k in this.allInstances) {
            ls = this.allInstances[k];
            maxCount = ls.length;
            useCount = ls.filter((m)=> m.parent).length;
            msg += k+':'+useCount+'/'+maxCount+'<br/>';
        }
        this.debugTxt.string = msg;
    }
});


// 创建一个node
exports.create = function(objName){
    var node = instance.get(objName);
    if(!node){
        console.error('createNode objName is null');
    }
    return node;
};

// 销毁一个node
exports.destroy = function(node, isClearup){
    node.removeFromParent();
    if(isClearup){
        node.destroy();
        node = null;
    }
};

// debug显示
exports.debug = function () {
    if(!ins.debugTxt){
        return;
    }
    const ins = instance;
    ins.debugTxt.node.parent.active = true;
    ins.showDebug();
    setInterval(()=> ins.showDebug(), 1000/60);
}