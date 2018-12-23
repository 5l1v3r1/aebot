let HieuID = "100002606806680";
let messageList = ["Hiếu câm mòm"];

function response(api, message) {
    if (global.configs.power_status == 0) {
        return;
    }
    
    if (message.senderID == HieuID) {
        api.sendMessage(messageList[0], message.threadID);
    }
}

module.exports = {
    response: response
}