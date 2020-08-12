var port = process.env.PORT || 8000;
var Http = require('http');
var Express = require('express');
const path = require('path')
var file = require('./filer')
const bodyParser = require('body-parser');
var App = Express();
var Server = Http.createServer(App);
const uri = 'mongodb://localhost:27017/test';

var user_collect;

App.use(function(req, res, next) {  // Enable cross origin resource sharing (for app frontend)
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    
    }
    else{
        next();
    }
})

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: true}));


db_handler.init_db(uri, function(){
  Server.listen(port, function () {  // Starts server with our modfied port settings
    console.log("server start at: http://localhost:"+port)
    user_collect = new db_handler.collection('test', 'users');  
  })
});