const fs = require("fs");
const login = require("facebook-chat-api");
const power_control = require("./aemodules/power_control.js");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

global.configs = JSON.parse(fs.readFileSync('config.json', 'utf8'));
global.threads = JSON.parse(fs.readFileSync('threads.json', 'utf8'));

var logged_in = fs.existsSync('appstate.json');
var creds = { email: process.env.FBEMAIL, password: process.env.FBPASSWD };
let moduleList = [power_control];

if (logged_in) {
    creds = { appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) };
}

login(creds, (err, api) => {

    if (err) return console.error(err);

    if (!logged_in) {
        fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    }

    api.listen((err, message) => {
        if (message.threadID in global.threads) {
            for (i in moduleList) {
                moduleList[i].response(api, message);
            }
        }
    });
});


function exitHandler() {
    console.log("Writing configs to file");
    fs.writeFileSync('config.json', JSON.stringify(global.configs));
    process.exit()
}

process.on('SIGINT', exitHandler);