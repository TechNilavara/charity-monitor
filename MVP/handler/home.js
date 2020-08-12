var events = require('events');
var q = require('q')
var event = new events.EventEmitter();


var param, output, l_callback;

function stopper(){
    output = global.user_collect.documents
    l_callback(output)
}

function main(params, method, callback){
    param = params
    l_callback = callback
    event.on('complete', stopper)
    eval(method+"()")
}

function get(){
    console.log("get")
    global.user_collect.load_collection(function(){
        event.emit('complete')
    });
}

module.exports = {main}