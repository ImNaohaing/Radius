/**
 * Created by jzj on 16/1/30.
 */


// mouse event handler.......
var currentSelect = {
    select: undefined,
    state: 'none',
    offset: undefined
};

gtw_canvas.onmousedown = function(e) {
    e.preventDefault();
    var p = tw_windowToCanvas(gtw_canvas, e.clientX, e.clientY);

    var selectedRects = new Array();
    for(var r in gtw_drawList.drawList){
        if(gtw_drawList.drawList.hasOwnProperty(r) && gtw_drawList.drawList[r].obj.isPointIn(p)){
            selectedRects.push(gtw_drawList.drawList[r]);
        }
    }
    if(selectedRects.length === 0) return;
    selectedRects.sort(function(a,b){
        return a.z - b.z;
    });

    var rrect = selectedRects.pop().obj;
    currentSelect.state = 'mouseDown';
    currentSelect.select = rrect;
    currentSelect.offset = p.to(rrect.leftTop);

    gtw_context.save();
    gtw_context.shadowColor = '#CACACA';
    gtw_context.shadowBlur = 5;
};

gtw_canvas.onmousemove = function(e) {
    e.preventDefault();
    var p = tw_windowToCanvas(gtw_canvas, e.clientX, e.clientY);
    if(currentSelect.state === 'mouseDown') {
        if(currentSelect.select !== undefined) {
            var newPos = Vector(p.x, p.y).add(currentSelect.offset);
            currentSelect.select.leftTop = Point(newPos.x, newPos.y);
        }
    }
};

gtw_canvas.onmouseup = function(e) {
    e.preventDefault();
    currentSelect.offset = undefined;
    currentSelect.select = undefined;
    currentSelect.state = 'none';
    gtw_context.restore();
};

// main func .........


//...
//...  一堆乱七八糟的代码


var s1 = TWStackView([],30,30,100);
var s2 = TWStackView([],30,30,100);
var s3 = TWStackView([],30,30,100);
var s4 = TWStackView([],30,30,100);
var s5 = TWStackView([],30,30,100);
var s6 = TWStackView([],30,30,100);
var s7 = TWStackView([],30,30,100);
gtw_drawList.add(s1,-1);
gtw_drawList.add(s2,-1);
gtw_drawList.add(s3,-1);
gtw_drawList.add(s4,-1);
gtw_drawList.add(s5,-1);
gtw_drawList.add(s6,-1);
gtw_drawList.add(s7,-1);


var calenderF = TWCalender(10,10,750,400);
calenderF.alignViewsToSec([s1,s2,s3,s4,s5,s6,s7]);


gtw_drawList.add(calenderF,-999);

var clickN = 0;
gtw_button.onclick = function(){
    switch(clickN) {
        case 0:{
            var v3 = TWLayer(15, 640, 100, 100, 5);
            v3.draw = function () {
                this.prepareDraw(true, true);
                this.finishDraw();
            };
            gtw_drawList.add(v3, 0);
            s1.appendLayer(v3);
            s1.style.bgColor = TWColor(0, 0, 0, 0);
            s1.style.lineColor = TWColor(0, 0, 0, 0);
            v3.style.lineColor.a = 0;
            v3.style.bgColor.a = 0;
            gtw_animation.traverseValue(v3.style.lineColor, 'a', 1, 1000);
            gtw_animation.traverseValue(v3.style.bgColor, 'a', 1, 1000);

        } break;
        case 1:{
            for(var i=0;i<3;++i){
                var v3 = TWLayer(15, 640, 100, 100, 5);
                v3.draw = function () {
                    this.prepareDraw(true, true);
                    this.finishDraw();
                };
                gtw_drawList.add(v3, 0);
                s2.appendLayer(v3);
                s2.style.bgColor = TWColor(0, 0, 0, 0);
                s2.style.lineColor = TWColor(0, 0, 0, 0);
                v3.style.lineColor.a = 0;
                v3.style.bgColor.a = 0;
                gtw_animation.traverseValue(v3.style.lineColor, 'a', 1, 1000);
                gtw_animation.traverseValue(v3.style.bgColor, 'a', 1, 1000);
            }
        } break;
        case 2:{
            var objs = s2.removeAt(0);
            for(var p in objs){
                if(!objs.hasOwnProperty(p)) continue;
                gtw_animation.traverseValue(objs[p].style.lineColor, 'a', 0, 1000);
                gtw_animation.traverseValue(objs[p].style.bgColor, 'a', 0, 1000);
            }
        } break;
        case 3:{
            for(var i=0;i<4;++i){
                var v3 = TWLayer(15, 640, 100, 100, 5);
                v3.draw = function () {
                    this.prepareDraw(true, true);
                    this.finishDraw();
                };
                gtw_drawList.add(v3, 0);
                s3.appendLayer(v3);
                s3.style.bgColor = TWColor(0, 0, 0, 0);
                s3.style.lineColor = TWColor(0, 0, 0, 0);
                v3.style.lineColor.a = 0;
                v3.style.bgColor.a = 0;
                gtw_animation.traverseValue(v3.style.lineColor, 'a', 1, 1000);
                gtw_animation.traverseValue(v3.style.bgColor, 'a', 1, 1000);
            }
        } break;
        case 4:{
            var objs = s3.removeAt(1,2);
            for(var p in objs){
                if(!objs.hasOwnProperty(p)) continue;
                gtw_animation.traverseValue(objs[p].style.lineColor, 'a', 0, 1000);
                gtw_animation.traverseValue(objs[p].style.bgColor, 'a', 0, 1000);
            }
        } break;
    }
    clickN += 1;

};
s1.alignLayers();
s2.alignLayers();
s3.alignLayers();
s4.alignLayers();
s5.alignLayers();
s6.alignLayers();
s7.alignLayers();

//Mon:
//    14:20-18:40: 减脂  -Repeat|Notify
//    12:11-14:11: 中午会议  -Notify
//Tue:
//    ...
//Wen:
//    ...
//
//5/17/2016: 发布产品 -Notify