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
    var getThreadInfoCallback = (err, info) => {
        api.sendMessage("```" + JSON.stringify(info) + "```", info.threadID);
    };

    switch(params) {
        case "getthreadinfo":
            api.getThreadInfo(message.threadID, getThreadInfoCallback)
            break;
        default:
            break;
    }
}

module.exports = {
    response: response
}