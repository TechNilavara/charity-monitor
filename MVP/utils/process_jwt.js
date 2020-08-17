var Express = require('express');
var jwt = require('jwt-simple');
var App = Express();
var moment = require('moment');

App.set('jwtTokenSecret',"test_string")

function init_jwt(data){
  var expires = moment().add(1, 'm').valueOf();
  var token = jwt.encode({
      iss: data.username,
      exp: expires
    }, App.get('jwtTokenSecret'));
    delete data.username
    return {
      token : token,
      expires: expires,
      user: data
    }
}

function get_access(token, callback){

  jwt_collect = new global.client.collection('test', 'tokens')
  login_collect = new global.client.collection('test','login')
  jwt_collect.find_item({'issued_jwt':token}, function(data){
    if('err' in data){
      global.access_crtl = "invalid"
      callback()
    }
    else{
      var decoded = jwt.decode(token, App.get('jwtTokenSecret'))
      if (decoded.exp <= Date.now()) {
        console.log("expired")
        jwt_collect.delete({'issued_jwt':token})
        global.access_crtl = "visitor"
        callback()
      }
      else {
        login_collect.find_item({'username':decoded.iss},function(data){
          global.access_crtl = data.user_type
          callback()
        })
      }
    }
  })  
}

module.exports = {
    init_jwt,
    get_access
}