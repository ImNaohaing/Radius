/**
 * Created by jzj on 16/1/30.
 */


// Array functions ..........
Array.prototype.tw_indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.tw_remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

// traverse value
/**
 @param [initial number] v1
 @param [destination number] v2
 @param [0-1 number] t
 @return [current number]
 */
Math.tw_lerp = function(v1,v2,t) {
    return v1 + (v2-v1)*t;
};
/**
 @param [initial number] v1
 @param [destination number] v2
 @param [current number] v3
 @return [progress number]
 */
Math.tw_progress = function(v1,v2,v3) {
    return (v3-v1)/(v2-v1);
};



