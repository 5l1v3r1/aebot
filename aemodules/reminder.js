const schedule = require("node-schedule");

function response(api, message) {
    if (global.configs.power_status == 0) {
        return;
    }

    let command = message.body;
    let cmd = "/remind";

    if (!command.startsWith(cmd)) {
        return;
    }

    var params = command.split(" ")[1].split("/");
    var task = {
        attendants: params[0],
        description: params[1],
        time: params[2]
    }

    if (task.time.startsWith("in ")) {
        var currentTime = new Date();
        var t = time.split(" ");
        for (var token = 1; token < t.length; token += 2) {
            switch (t[token + 1].substring(0, 3)) {
                case "sec":
                    currentTime.setSeconds(currentTime.getSeconds() + parseInt(t[token]));
                    break;
                case "min":
                    currentTime.setMinutes(currentTime.getMinutes() + parseInt(t[token]));
                    break;
                case "hou":
                    currentTime.setHours(currentTime.getHours() + parseInt(t[token]));
                    break;
                case "day":
                    currentTime.setDate(currentTime.getDate() + parseInt(t[token]));
                    break;
                default:
                    break
            }
        }
    } else if (task.time.startsWith("at ")) {

    } else {
        api.sendMessage("/remind <who>/<what>/<in <duration>/at <time>>", message.threadID);
    }
}

module.exports = {
    response: response
}