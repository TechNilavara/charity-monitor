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

    add_item(item, callback){
        this.collect.insertOne(item, function(err, obj){
            if (err) callback(err)
            else callback(obj)
        })
    }
    
    find_item(item, callback){
        this.collect.findOne(item, function(err, data){
            if (data == null) callback({'err':'101'});  
            else callback(data) 
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
    
    delete(item,callback=this.print){
        this.collect.deleteOne(item, function(err,obj){
            if (err) throw err;
            callback(obj)
        })
    }
    print(obj){
        console.log(obj.result.n," item(s) deleted")
    }
}

module.exports = {
    init_db,
    collection
}