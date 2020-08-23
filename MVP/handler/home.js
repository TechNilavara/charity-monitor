var events = require('events');
var q = require('q')
var event = new events.EventEmitter();


var param, output, l_callback, summary_collect;

function stopper(){
    output = summary_collect.documents
    l_callback(output)
}

function main(params, method, callback){
    param = params
    l_callback = callback
    event.once('complete', stopper)
    eval(method+"()")
}

function get(){
    console.log("get")
    summary_collect = new global.client.collection('test',"ngo_summary")
    summary_collect.load_collection(function(){
        event.emit('complete')
    });
}

module.exports = {main}