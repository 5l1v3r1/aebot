let HieuID = "100002606806680";
let messageList = ["Hiếu câm mòm"];

function response(api, message) {
    if (message.senderID == HieuID) {
        api.sendMessage(messageList[0], message.threadID);
    }
}

module.exports = {
    response: response
}