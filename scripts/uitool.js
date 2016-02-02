/**
 * Created by jzj on 16/1/30.
 */


var TWColor = function(r,g,b,a){
    var color = {
        r: r,
        g: g,
        b: b,
        a: a
    };
    color.__proto__ = TWColorFunc;
    return color;
};
var TWColorFunc = {
    toStyle: function(){
        var s = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
        return s;
    }
};

var TWCalender = function(x,y,width,height) {
    var calender = {
        sectionNum: 7
    };
    tw_injectObjVar(calender, TWLayer(x,y,width,height));
    calender.style.gridMarginTop = 40;
    calender.style.topTextMarginTop = 20;
    calender.style.textStyle = 'black';
    calender.style.textLag = 'zh';
    calender.style.bgColor = TWColor(33,153,232,1);
    calender.style.lineColor = TWColor(212,212,212,1);
    calender.__proto__ = TWCalenderFunc;
    return calender;
};

var TWCalenderFunc = {
    createPath: function() {
        if(this.sectionNum <= 1) return;
        var sectionWidth = this.size.x / this.sectionNum;
        this.beginPath();
        for(var i=1;i<this.sectionNum;++i) {
            this.moveTo(i*sectionWidth,this.style.gridMarginTop);
            this.lineTo(i*sectionWidth,this.size.y);
        }
    },
    drawGrid: function() {
        this.save();
        this.createPath();
        this.setStrokeStyle(this.style.lineColor.toStyle());
        this.setLineWidth(this.style.lineWidth = 0.5);
        this.stroke();
        this.restore();
    },
    drawText: function() {
        this.save();
        this.setTextAlign('center');
        this.setTextBaseline('middle');
        this.setFillStyle(this.style.textStyle);
        var days = 0,
            secs = this.sectionNum*2,
            secsWidth = this.size.x / secs;
        for(var i=0;i<secs;++i) {
            if(i%2 === 0) continue;
            var text = gtw_daysText[this.style.textLag][days],
                txtWidth = this.measureText(text).width / 2,
                centerX = secsWidth*i;
            this.fillText(text,centerX,this.style.topTextMarginTop);
            days += 1;
        }
        this.restore();
    },
    draw: function(){
        this.drawGrid();
        this.drawText();
    },
    alignViewsToSec: function(views){
        var secs = this.sectionNum*2,
            secsWidth = this.size.x / secs,
            viewSub = 0;
        for(var i=0;i<secs;++i) {
            if(i%2 === 0) continue;
            var centerX = secsWidth* i,
                vhw = views[viewSub].size.x/ 2,
                vh = views[viewSub].size.y;

            // 在这里调用其他对象的功能也可以
            TWViewFunc.movePos.apply(this,[views[viewSub],centerX-vhw,this.style.gridMarginTop,0]);
            viewSub += 1;
        }
    }
}; TWCalenderFunc.__proto__ = TWLayerFunc;

var gtw_daysText = {
    en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    zh: ['一','二','三','四','五','六','日']
};

// TWStackView class ..............
var TWStackView = function(layers,x,y,width){
    var stackView = {
        layers: [],
        margin: 5
    };
    tw_injectObjVar(stackView, TWView(x,y,0,0));
    stackView.__proto__ = TWStackViewFunc;
    for(var l in layers){
        if(!layers.hasOwnProperty(l)) continue;
        stackView.layers.push(layers[l]);
    }
    stackView.size.x = width;
    stackView.alignLayers();
    return stackView;
};

var TWStackViewFunc = {
    alignLayers: function(){
        var x = 0,
            y = 0;
        this.size.y = 0;
        for(var l in this.layers){
            if(!this.layers.hasOwnProperty(l)) continue;
            this.movePos(this.layers[l],x,y,1000);
            this.size.y += this.layers[l].size.y;
            this.size.y += this.margin;
            y = this.size.y;
        }
    },
    addLayer: function(layer){
        this.layers.push(layer);
        this.alignLayers();
    },
    appendLayer: function(layer){
        this.layers.push(layer);
        this.setPos(layer,0,this.size.y + 180);
        this.alignLayers();
    },
    removeAt: function(pos,deleteCount){
        var dc = typeof(deleteCount) !== 'number' ? 1 : deleteCount;
        if(!this.layers[pos] || !this.layers[pos+dc]) return;
        var objsRemoved = this.layers.splice(pos,dc);
        this.alignLayers();
        return objsRemoved;
    },
    //drawLayers: function(){
    //    for(var l in this.layers){
    //        if(!this.layers.hasOwnProperty(l)) continue;
    //        this.layers[l].draw();
    //    }
    //},
    draw: function(){
        this.__proto__.__proto__.draw.apply(this,[true,true]);
        //this.drawLayers();
    }
}; TWStackViewFunc.__proto__ = TWViewFunc;