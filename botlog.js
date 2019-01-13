//TODO - add file logging
exports.logMessage = function (msg, message){
    const date = new Date();
    const logMsg = `--Log ${date}
        -User: ${message.author.tag}
        -Server: ${message.guild}
        ${msg}`;
    console.log(logMsg);
}
exports.log = function (msg){
    console.log(msg);
}