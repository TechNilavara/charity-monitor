
var port = process.env.PORT || 8000; // Better flexibility than hardcoding the port
const db_handler = require("../utils/db_handler");
var Https = require('https');
var Express = require('express');
var path = require('path');
var token_handel = require('../utils/process_jwt')
var fs = require('fs')
var filer = require('../utils/filer')
var url = require('url')
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

App.use(function(req, res, next){
    Object.assign(req.body, {"access_token":
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJleGFtcGxlQHh5ei5jb20iLCJleHAiOjE1OTc0OTE2OTI5NzV9.vziHqm3UaG9ovsRGuoz0pGQE3oDmD1PK5dlsFMEmR6U"})
    var parsed_url = url.parse(req.url, true)
    var token = (req.body && req.body.access_token)
     || parsed_url.query.access_token || req.headers["x-access-token"];

    if (token) {
      token_handel.get_access(req.body.access_token, function(){
        console.log(global.access_crtl)
        delete req.body.access_token
        if(global.access_crtl == 'invalid')
          res.json({'err':'000'})
        else next()
      })
    }
    else next()
})

App.use(function(req, res, next) {
    //body = req.body
    //req.body = {}
    //Object.assign(req.body, {'donor':body})
    filer.log(req)
    struct(req, res,{
        'api' : path.resolve('../config/struct.json')    
  })
  
});

uri = 'mongodb://localhost:27017/test'
db_handler.init_db(uri, function(){
  Server.listen(port, function () {  // Starts server with our modfied port settings
    console.log("Session test server start at: https://localhost:"+port)
    global.client = db_handler 
  })
});

