/**
 * Created by jzj on 16/1/30.
 */

var TWLayer = function(x,y,width,height){
    var layer = {};
    tw_injectObjVar(layer, RoundedRect(x,y,width,height,10));
    layer.__proto__ = TWLayerFunc;
    return layer;
};

var TWLayerFunc = {
    prepareDraw: function(bgStroke,bgFill){
        this.__proto__.draw.apply(this,[bgStroke,bgFill]);
        this.save();
        this.setFillStyle(this.style.bgColor.toStyle());
        this.setStrokeStyle(this.style.lineColor.toStyle());
        this.setLineWidth(this.style.lineWidth);
    },
    finishDraw: function(){
        this.restore();
    },

    // Complete drawing directives
    beginPath: function(){
        gtw_context.beginPath();
    },
    closePath: function(){
        gtw_context.closePath();
    },
    moveTo: function(x,y){
        gtw_context.moveTo(this.leftTop.x+x, this.leftTop.y+y);
    },
    arcTo: function(x1,y1,x2,y2,radius){
        gtw_context.arcTo(this.leftTop.x+x1,this.leftTop.y+y1,this.leftTop.x+x2,this.leftTop.y+y2,radius);
    },
    lineTo: function(x,y){
        gtw_context.lineTo(this.leftTop.x+x, this.leftTop.y+y);
    },
    save: function(){
        gtw_context.save();
    },
    restore: function(){
        gtw_context.restore();
    },
    fill: function(){
        gtw_context.fill();
    },
    stroke: function(){
        gtw_context.stroke();
    },
    fillText: function(text,x,y) {
        return gtw_context.fillText(text,this.leftTop.x+x,this.leftTop.y+y);
    },
    measureText: function(text){
        return gtw_context.measureText(text);
    },
    setFillStyle: function(style) {
        gtw_context.fillStyle = style;
    },
    setStrokeStyle: function(style) {
        gtw_context.strokeStyle = style;
    },
    setLineWidth: function(style) {
        gtw_context.lineWidth = style;
    },
    setTextAlign: function(align){
        gtw_context.textAlign = align;
    },
    setTextBaseline: function(baseline){
        gtw_context.textBaseline = baseline;
    }


}; TWLayerFunc.__proto__ = RoundedRectFunc;

var TWView = function(x,y,width,height){
    var view = {};
    tw_injectObjVar(view, Rect(x,y,width,height));
    view.__proto__ = TWViewFunc;
    return view;
};

var TWViewFunc = {
    setPos: function(layer,x,y){
        layer.leftTop.x = this.leftTop.x+x;
        layer.leftTop.y = this.leftTop.y+y;
    },
    movePos: function(layer,x,y,time){
        gtw_animation.traverseValue(layer.leftTop,'x',this.leftTop.x+x,time);
        gtw_animation.traverseValue(layer.leftTop,'y',this.leftTop.y+y,time);
    }
}; TWViewFunc.__proto__ = RectFunc;