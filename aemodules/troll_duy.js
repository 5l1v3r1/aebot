let DuyID = "100000379068861";
let messageList = ["Duy câm mòm"];

function response(api, message) {
    if (global.configs.power_status == 0) {
        return;
    }
    
    if (message.senderID == DuyID) {
        api.sendMessage(messageList[0], message.threadID);
    }
}

module.exports = {
    response: response
}