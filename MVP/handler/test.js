var events = require('events');
var event = new events.EventEmitter();

const db_handler = require("../utils/db_handler");

uri = 'mongodb://localhost:27017/test'
var user_collect;

db_handler.init_db(uri, function(){
    console.log("here")
    user_collect = new db_handler.collection('test', 'users');
    user_collect.load_collection(function(){
        event.emit('db_loaded')
    })    
})
var here1 = function here1(){
    console.log(user_collect.documents)
}

event.on('db_loaded', here1)
console.log("here1");