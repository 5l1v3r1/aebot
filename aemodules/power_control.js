function response(api, message) {
    let cmd = "/power"
    if (global.configs.isAdmin.indexOf(message.senderID) == -1) {
        return;
    }

    command = message.body;

    if (!command.startsWith(cmd)) {
        return;
    }
    
    var params = command.substring(cmd.length + 1, command.length);

    if (params == "on") {
        global.configs.power_status = 1;
        api.sendMessage("aebot turned on.", message.threadID);
    } else if (params == "off") {
        global.configs.power_status = 0;
        api.sendMessage("aebot turned off.", message.threadID);
    } else if (params == "status") {
        api.sendMessage("power_status = " + global.configs.power_status, message.threadID);
    }
}

module.exports = {
    response: response
}