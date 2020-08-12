const fs = require('fs');
const isEmpty = require('./utils/check_empty').isEmpty
const depthOf = require('./utils/check_depth').depthOf
const transport = require('./router').transport_reqest

var req_struct, valid=false, param={}, structure, res;

function process_req(req, lres, paths){
    res = lres
    struct_file = paths.api;
    var req_path, method;
    structure = JSON.parse(fs.readFileSync(struct_file));
    if(req.path in structure.path){
        req_path = req.path; 
        req_method = req.method.toLowerCase() 
        //console.log(req_method, req_path,structure.path[req_path])
        if(req_method in structure.path[req_path]){
            valid = true;
            req_struct = structure.path[req_path][req_method]
        }
    }
    if(valid){
        extract_param(req, res)
        response = transport(param, req_path, req_method,
             validate_response)
    }
    else
        console.log("Invalid request")
        //res.send('140')
}

function extract_param(req, res){
    if(!isEmpty(req_struct.parameters)){
        var schema = {};
        var types = Object.keys(req_struct.parameters);
        var fields = {};
        for(i of types){
            if('schema' in req_struct.parameters[i]){
                schema = req_struct.parameters[i].schema;
                Object.assign(param, req[i])
                Object.assign(fields, extract_schema(schema.item))
                schema = fields
            }
            else{
                schema = {}
                for(key of Object.keys(req_struct.parameters[i]))
                    if(key in req[i]){
                        fields={}
                        param[key] = req[i][key]
                        temp = req_struct.parameters[i][key].schema
                        Object.assign(fields, extract_schema(temp.item))
                        schema[key] = fields
                    }
            }
        }
        if(depthOf(schema)-1 != depthOf(param))
            console.log('Error',schema, depthOf(schema))
        else{
            if(depthOf(param)==1){
                for(i of Object.keys(schema))
                    if(i in param) continue
                    else param[i] = "NA"
            }
            else{
                for(i of Object.keys(schema))
                    if(i in param)
                        for(j of Object.keys(schema[i]))
                            if(j in param[i]) continue
                            else param[i][j] = "NA"
                    else param[i] = "NA"
            }
        }
    }
}

function extract_schema(item){
    var temp = {}
    for(k of item){
        items = k.toString().split('/')
        if('item' in structure.def[items[1]])
            Object.assign(temp, extract_schema(structure.def[items[1]].item))
        else{
            Object.assign(temp, structure.def[items[1]].property)
        }
    }   
    return(temp)
}

function validate_response(lparams){
    console.log("validate_response", lparams)
    if (typeof(lparams)=='object') res.json(lparams)
    else res.send(lparams)
}

module.exports= {
    process_req,
    validate_response
}