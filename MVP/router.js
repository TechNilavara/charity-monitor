const handler = require("./handler")
function transport_reqest(param, path, method, callback){
    path = path.split('/')[1]
    handler[path](param, method, function(data){
        callback(data)
    })
}

module.exports = {transport_reqest}