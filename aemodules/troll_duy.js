let DuyID = "100000379068861";
let messageList = ["Duy câm mòm"];
let lastTrollDuy = 0;

function response(api, message) {
    if (global.configs.power_status == 0) {
        return;
    }
    
    var diff = new Date() - lastTrollDuy;
    if (diff <= global.trollLimit) {
        return;
    }

    if (message.senderID == DuyID) {
        lastTrollDuy = new Date();
        api.sendMessage(messageList[0], message.threadID);
    }
}

module.exports = {
    response: response
}