var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/log.txt', {flags : 'w'});
var log_stdout = process.stdout;

function log(data)
{
    log_file.write(util.format(data) + "\n_________________End of Message_______"+
    "________________\n\n\n");
    console.log("logged")
    //log_stdout.write(util.format(d) + '\n');

}
module.exports = {log}