/**
 * Created by jzj on 16/1/28.
 */

// Point class ......................
var Point = function(x,y) {
    var p = {
        x: x,
        y: y
    };
    p.__proto__ = PointFunc;
    return p;
};

var PointFunc = {
    to: function(p) {
        return Vector(p.x- this.x, p.y- this.y);
    },
    from: function(p) {
        return Vector(this.x- p.x,this.y- p.y);
    }
};

// Vector class ......................
var Vector = function(x,y) {
    var v = {};
    tw_injectObjVar(v,Point(x,y));
    v.__proto__ = VectorFunc;
    return v;
};

var VectorFunc = {
    add: function(v) {
        return Vector(this.x+ v.x,this.y+ v.y);
    },
    subtract: function(v) {
        return Vector(this.x- v.x,this.y- v.y);
    }
}; VectorFunc.__proto__ = PointFunc;


// Rect class ......................
var Rect = function(x,y,width,height) {
    var r = {
        leftTop: Point(x,y),
        size: Point(width,height),
        style: {
            lineColor: TWColor(212,212,212,1),
            bgColor: TWColor(246,246,246,1),
            lineWidth: 1
        },
    };
    r.__proto__ = RectFunc;
    return r;
};

var RectFunc = {
    createPath: function() {
        gtw_context.beginPath();
        gtw_context.moveTo(this.leftTop.x, this.leftTop.y);
        gtw_context.lineTo(this.leftTop.x + this.size.x, this.leftTop.y);
        gtw_context.lineTo(this.leftTop.x + this.size.x, this.leftTop.y + this.size.y);
        gtw_context.lineTo(this.leftTop.x, this.leftTop.y + this.size.y);
        gtw_context.closePath();
    },
    isPointIn: function(p) {
        this.createPath();
        return gtw_context.isPointInPath(p.x, p.y);
    },
    draw: function(stroke,fill) {
        if(!stroke && !fill) return;
        gtw_context.save();
        this.createPath();
        gtw_context.fillStyle = this.style.bgColor.toStyle();
        gtw_context.strokeStyle = this.style.lineColor.toStyle();
        gtw_context.lineWidth = this.style.lineWidth;
        if(fill)
            gtw_context.fill();
        if(stroke)
            gtw_context.stroke();
        gtw_context.restore();
    }
};


// RoundedRect class .............
var RoundedRect = function(x,y,width,height,cornerRadius) {
    var r = {};
    tw_injectObjVar(r,Rect(x,y,width,height));
    r.__proto__ = RoundedRectFunc;
    r.style.cornerRadius = cornerRadius;
    return r;
};

var RoundedRectFunc = {
    createPath: function() {
        gtw_context.beginPath();
        gtw_context.moveTo(this.leftTop.x+ this.style.cornerRadius, this.leftTop.y);
        gtw_context.arcTo(this.leftTop.x+this.size.x,this.leftTop.y,this.leftTop.x+this.size.x,this.leftTop.y+this.size.y,this.style.cornerRadius);
        gtw_context.arcTo(this.leftTop.x+this.size.x,this.leftTop.y+this.size.y,this.leftTop.x,this.leftTop.y+this.size.y,this.style.cornerRadius);
        gtw_context.arcTo(this.leftTop.x,this.leftTop.y+this.size.y,this.leftTop.x,this.leftTop.y,this.style.cornerRadius);
        gtw_context.arcTo(this.leftTop.x,this.leftTop.y,this.leftTop.x+this.style.cornerRadius,this.leftTop.y,this.style.cornerRadius);
    },
    draw: function(stroke,fill) {
        if(!stroke && !fill) return;
        gtw_context.save();
        this.createPath();
        gtw_context.fillStyle = this.style.bgColor.toStyle();
        gtw_context.strokeStyle = this.style.lineColor.toStyle();
        gtw_context.lineWidth = this.style.lineWidth;
        if(fill)
            gtw_context.fill();
        if(stroke)
            gtw_context.stroke();
        gtw_context.restore();
    }
}; RoundedRectFunc.__proto__ = RectFunc;







