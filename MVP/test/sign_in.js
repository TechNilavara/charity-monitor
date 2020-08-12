
var port = process.env.PORT || 8000; // Better flexibility than hardcoding the port
const db_handler = require("../utils/db_handler");
var Https = require('https');
var Express = require('express');
var path = require('path');
var fs = require('fs')
var filer = require('../utils/filer')
const bodyParser = require('body-parser');
struct = require('../struct_parser').process_req
var App = Express();

const options = {
    key: fs.readFileSync('../certificates/key.pem'),
    cert: fs.readFileSync('../certificates/cert.pem')
};

var Server = Https.createServer(options, App);

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
App.use(function(req, res, next) {
    filer.log(req)
    struct(req, res,{
        'api' : path.resolve('../config/struct.json')    
  })
  
});

uri = 'mongodb://localhost:27017/test'
db_handler.init_db(uri, function(){
  Server.listen(port, function () {  // Starts server with our modfied port settings
    console.log("Signup test server start at: https://localhost:"+port)
    global.client = db_handler 
  })
});

