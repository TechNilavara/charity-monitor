
var port = process.env.PORT || 8000; // Better flexibility than hardcoding the port

var Http = require('http');
var Express = require('express');
var Path = require('path');
var file = require('./filer')

var App = Express();
var Server = Http.createServer(App);

App.use(function(req, res) {  // Enable cross origin resource sharing (for app frontend)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    file.log(req)
    console.log(req.method)
    
});

Server.listen(port, function () {  // Starts server with our modfied port settings
    console.log("server start at: http://localhost:"+port)
});
