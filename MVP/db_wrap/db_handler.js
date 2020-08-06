var MongoClient = require('mongodb').MongoClient
uri = 'mongodb://localhost:27017/admin' //dummy url
const client = new MongoClient(uri,{useUnifiedTopology: true});

var cluster;

function init_db(url, callback){
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
        if (err) throw err
        cluster = client;
        console.log("Connected to MongoDb");
        callback();
    });
}

class collection{
    constructor(db_name, collection_name){
        this.db = cluster.db(db_name);
        this.collect = this.db.collection(collection_name);
        this.documents = [];
        this.updated = false;
    }

    add_item(item){
        this.collect.insertOne(item)
        .catch(function(err){
            console.log(err.name)
            console.log(err.message)
            //console.log(err.keyValue)
            //console.log(Object.keys(err)) // code, message, name, connectionId
        })
    }
    
    find_item(item, callback){
        this.collect.find(item).toArray(function(err, data){
            if (err) throw err;  
            return callback(data) 
        })
    }

    load_collection(callback){
        this.collect.find().toArray(function(err, data){
            if (err) throw err;
            this.documents = data;
            this.updated = true;
            callback();
        }.bind(this))
    }
}

module.exports = {
    init_db,
    collection
}