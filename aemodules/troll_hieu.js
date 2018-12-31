let HieuID = "100002606806680";
let messageList = ["Hiếu câm mòm"];
let lastTrollHieu = 0;

function response(api, message) {
    if (global.configs.power_status == 0) {
        return;
    }
    
    var diff = new Date() - lastTrollHieu;
    if (diff <= global.trollLimit) {
        return;
    }
    
    if (message.senderID == HieuID) {
        lastTrollHieu = new Date();
        api.sendMessage(messageList[0], message.threadID);
    }
}

module.exports = {
    response: response
}