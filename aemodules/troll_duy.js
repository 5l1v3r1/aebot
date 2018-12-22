let DuyID = "100000379068861";
let messageList = ["Duy câm mòm"];

function response(api, message) {
    if (message.senderID == DuyID) {
        api.sendMessage(messageList[0], message.threadID);
    }
}

module.exports = {
    response: response
}