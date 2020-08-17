const crypt = require('../utils/crypt')
const bcrypt = require('bcrypt')
var events = require('events');
const { types } = require('util');
var token_handle = require('../utils/process_jwt')
var event = new events.EventEmitter();

var l_params, l_callback, user_collect;
function stopper(data){
    l_callback(data)
}

//Generate token after login
function gen_jwt(ldata){
    data = token_handle.init_jwt(ldata)
    event.emit('complete', data)
    jwt_collect = new global.client.collection('test', 'tokens')
    jwt_collect.add_item({'issued_jwt':data.token},function(){})
}

//compare input password in req with one from db
function compare_pswd(entered, saved){
    newPswd = crypt.append(entered);
    return bcrypt.compareSync(newPswd, saved);
}

//login validation
function post(){
    var type = Object.keys(l_params)
    var user_data = {}, collect_name, passwd;

    //username and password to user_data
    Object.assign(user_data, {'username': l_params.emailid})
    Object.assign(user_data, {'password':l_params.password})
    
    user_collect = new global.client.collection('test', 'auth0')
    login_collect = new global.client.collection('test','login')

    //check if username is present in auth0
    user_collect.find_item({'username':user_data.username},function(data){
        if('err' in data) event.emit('complete', {'err':'150'})
        else{
            //validate username password
            if(compare_pswd(user_data.password, data.password))
            {
                //get user summary _id using username
                login_collect.find_item({'username':user_data.username},function(data){
                    if ('err' in data) event.emit('complete',{'err':'160'})
                    else{
                        collect_name = data.user_type+"_summary"
                        summary_collect = new global.client.collection('test',collect_name)
                        //extract donor or NGO summary
                        summary_collect.find_item({'_id':data.summary_id},function(data){
                            Object.assign(data, {'username': l_params.emailid})
                            if('err' in data) event.emit('complete',{'err':'160'})
                            //create token
                            else event.emit('get_token',data)
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
    event.once('get_token', gen_jwt)
    event.once('complete', stopper)
    eval(method+"()")
}
module.exports = {main}