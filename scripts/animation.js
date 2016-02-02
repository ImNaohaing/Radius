/**
 * Created by jzj on 16/1/30.
 */

var gtw_paused = false;

// drawList object ........
// 因为只有全局一个对象,所以直接把方法封装在内部
var gtw_drawList = {
    /*...........
     drawList : Array <
     {
       obj: obj,
       z: z
     } >
    ............*/
    drawList: new Array(),
    add: function(obj,z) {
        if(typeof(z) !== 'number') return;
        this.drawList.push({
            obj: obj,
            z: z
        });
        this.drawList.sort(function(a,b){
            return Math.floor(a.z - b.z);
        });
    },
    addList: function(objs,z) {
        if(typeof(z) !== 'number') return;
        if(objs.length === 0) return;
        
    }
};

// animation target
var gtw_animation = {
    targets: new Array(),
    update: function(){
        var now = (new Date()).getTime();
        for(var p in this.targets) {
            if(!this.targets.hasOwnProperty(p) || !this.targets[p]) continue;
            var t = this.targets[p];
            if(now >= t.timeEnd) {
                t.obj[t.property] = t.desired;
                this.targets[p] = undefined;
                this.targets.splice(parseInt(p),1);
                continue;
            } else {
                var progress = Math.tw_progress(t.timeStart, t.timeEnd, now);
                t.obj[t.property] = Math.tw_lerp(t.initial, t.desired, progress);
            }
        }

    },
    traverseValue: function(obj,property,desired,time) {
        if(obj[property] === undefined) return;
        var date = new Date();
        var t = {
            obj: obj,
            property: property,
            initial: obj[property],
            desired: desired,
            timeStart: date.getTime(),
            timeEnd: time + date.getTime()
        };
        gtw_animation.targets.push(t);
    }
};

function tw_animate(time) {
    if(!gtw_paused){
        gtw_context.clearRect(0,0,gtw_canvas.width,gtw_canvas.height);
        gtw_animation.update();

        // draw objs in drawList
        for(var d in gtw_drawList.drawList){
            if(gtw_drawList.drawList.hasOwnProperty(d)) {
                if(!gtw_drawList.drawList[d] || !gtw_drawList.drawList[d].obj || !gtw_drawList.drawList[d].obj["draw"]) {
                    gtw_drawList.drawList.splice(parseInt(d),1);
                } else {
                    gtw_drawList.drawList[d].obj["draw"]();
                }
            }
        }
        gtw_context.save();
        gtw_context.fillStyle = 'cornflowerblue';
        gtw_context.fillText(calculateFps().toFixed() + 'fps',0,10);
        gtw_context.restore();
        window.requestAnimationFrame(tw_animate);
    }
}

// start  .........
function tw_startAnimation() {
    window.requestAnimationFrame(tw_animate);
}


var lastTime = 0;
function calculateFps() {
    var now = new Date(),
        fps = 1000 / (now - lastTime);
    lastTime = now;
    return fps;
}

tw_startAnimation();