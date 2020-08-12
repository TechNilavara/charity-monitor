function append(passwrod){
    var pos = 0;
    var add = passwrod.length%2;
    var extra = "";
    for(i of passwrod){
        extra += String.fromCodePoint(i.charCodeAt(0)+(Math.pow(-1,pos+add)));
        pos++;
    }
    new_str = passwrod+extra;
    return new_str
}
function seedSalt(passwrod){
    return passwrod.length%4+11
}

module.exports = {
    append,
    seedSalt
}
