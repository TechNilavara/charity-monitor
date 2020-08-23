const db_handler = require("../MVP/utils/db_handler");

uri = 'mongodb://localhost:27017/test'
db_handler.init_db(uri, function(){
    client = db_handler
    jwt_collect = new client.collection('test', 'tokens')
    jwt_collect.purge(function(data){
        console.log(data)
    })
})