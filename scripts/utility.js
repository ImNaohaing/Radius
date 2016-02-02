/**
 * Created by jzj on 16/1/30.
 */


// windowToCanvas global function........
function tw_windowToCanvas(canvas,clientX,clientY) {
    var bbox = canvas.getBoundingClientRect();
    return Point(
        clientX - bbox.left * (canvas.width / bbox.width),
        clientY - bbox.top * (canvas.height / bbox.height)
    );
}

function tw_injectObjVar(receptor, injector) {
    for(var p in injector) {
        if(!injector.hasOwnProperty(p)) continue;
        if(typeof(injector[p]) !== 'function'){
            receptor[p] = injector[p];
        }
    }
}
