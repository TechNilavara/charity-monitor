const crypt = require('../utils/crypt')
const bcrypt = require('bcrypt')
var events = require('events');
const { types } = require('util');
var event = new events.EventEmitter();

var l_params, l_callback, user_collect;
function stopper(data){
    l_callback(data)
}

function hash_pswd(password){
    newPswd = crypt.append(password);
    saltCount = crypt.seedSalt(password);
    return bcrypt.hashSync(newPswd, saltCount)
}

function post(){
    var type = Object.keys(l_params)
    var user_data = {}
    Object.assign(user_data, {'username': l_params[type].emailid})
    Object.assign(user_data, {'password':l_params[type].password})
    delete l_params[type].username
    delete l_params[type].password
    collect_name = type+"_summary"
    summary_collect = new global.client.collection('test',collect_name)
    user_collect = new global.client.collection('test', 'auth0')
    login_collect = new global.client.collection('test','login')
    summary_collect.add_item(l_params[type],function(data){
       if (11000 == data.code){
            event.emit('complete', {'err':'100'})
       }
       else{
            summary_id = data.ops[0]._id;
            password = user_data.password
            password = hash_pswd(password)
            user_data.password = password
            user_collect.add_item(user_data, function(data){
                if (11000 == data.code) event.emit('complete', {'err':'120'})
                else {
                    login_data = {}
                    login_data.summary_id = summary_id
                    login_data.user_id = data.ops[0]._id;
                    login_data.user_type = type[0]
                    login_collect.add_item(login_data, function(data){
                        if (11000 == data.code) event.emit('complete', {'err':'150'})
                        else event.emit('complete', {'status':'200'})
                    })
                }
            })
       }
    })
}

function main(params, method, callback){
    l_params = params
    l_callback = callback
    event.once('complete', stopper)
    eval(method+"()")
}
module.exports = {main}