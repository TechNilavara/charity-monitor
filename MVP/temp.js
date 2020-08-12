struct = require('./struct_parser').process_req
const path = require('path')
var events = require('events');
var event = new events.EventEmitter();

const db_handler = require("./utils/db_handler");

var paths = {
    'api' : path.resolve('./config/struct.json'),
    'handler' : path.resolve('./db_wrap/db_handler.js')
}
var req = {
    'path' : '/home',
    'method' : 'get',
    'body' : {
        //"donor" : "asdf",
        "ngo" : {
            "state":"bad"
        }
    }
}

uri = 'mongodb://localhost:27017/test'

db_handler.init_db(uri, function(){
    global.user_collect = new db_handler.collection('test', 'users');
    //user_collect.load_collection(function(){
        event.emit('db_loaded')
    //})    
})
var here1 = function here1(){
    struct(req,'asdf',paths)
}

event.on('db_loaded', here1)
//struct(req,'asdf',paths)