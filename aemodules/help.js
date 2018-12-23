function response(api, message) {
    if (global.configs.power_status == 0) {
        return;
    }

    let command = message.body;
    let cmd = "/help";

    if (!command.startsWith(cmd)) {
        return;
    }

    var params = command.split(" ")[1];

    switch(params) {
        case "getthreadinfo":
            let threadInfo = api.getThreadInfo(message.threadID);
            api.sendMessage(threadInfo, message.threadID);
            break;
        default:
            break;
    }
}

module.exports = {
    response: response
}