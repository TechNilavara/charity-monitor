const crypt = require('../utils/crypt')
const bcrypt = require('bcrypt')
var events = require('events');
const { types } = require('util');
var event = new events.EventEmitter();

var l_params, l_callback, user_collect;
function stopper(data){
    l_callback(data)
}

function compare_pswd(entered, saved){
    newPswd = crypt.append(entered);
    return bcrypt.compareSync(newPswd, saved);
}
function post(){
    var type = Object.keys(l_params)
    var user_data = {}, collect_name, passwd;
    Object.assign(user_data, {'username': l_params.emailid})
    Object.assign(user_data, {'password':l_params.password})
    
    user_collect = new global.client.collection('test', 'auth0')
    login_collect = new global.client.collection('test','login')

    user_collect.find_item({'username':user_data.username},function(data){
        if('err' in data) event.emit('complete', {'err':'150'})
        else{
            if(compare_pswd(user_data.password, data.password))
            {
                login_collect.find_item({'user_id':data._id},function(data){
                    if ('err' in data) event.emit('complete',{'err':'160'})
                    else{
                        collect_name = data.user_type+"_summary"
                        summary_collect = new global.client.collection('test',collect_name)
                        summary_collect.find_item({'_id':data.summary_id},function(data){
                            if('err' in data) event.emit('complete',{'err':'160'})
                            else event.emit('complete',data)
                        })
                    }
                })
            }
            else event.emit('complete', {'err':'170'})
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