const fs = require("fs");
const login = require("facebook-chat-api");
const power_control = require("../aemodules/power_control.js");
const troll_duy = require("../aemodules/troll_duy.js");
const troll_hieu = require("../aemodules/troll_hieu.js");
const help_module = require("../aemodules/help.js");
const admin_module = require("../aemodules/admin.js");
const reminder = require("../aemodules/reminder.js");
const greet = require("../aemodules/greet.js");
const library = require("../aemodules/library.js");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

global.configs = JSON.parse(fs.readFileSync('../configs/config.json', 'utf8'));
global.threads = JSON.parse(fs.readFileSync('../configs/threads.json', 'utf8'));

var logged_in = fs.existsSync('../configs/appstate.json');
var creds = { email: process.env.FBEMAIL, password: process.env.FBPASSWD };
let moduleList = [power_control, troll_duy, troll_hieu, help_module, reminder];

if (logged_in) {
    creds = { appState: JSON.parse(fs.readFileSync('../configs/appstate.json', 'utf8')) };
}

login(creds, (err, api) => {

    if (err) return console.error(err);

    if (!logged_in) {
        fs.writeFileSync('../configs/appstate.json', JSON.stringify(api.getAppState()));
    }

    api.listen((err, message) => {
        if (err != null) {
            return;
        }
        
        if (message.threadID in global.threads) {
            for (i in moduleList) {
                moduleList[i].response(api, message);
            }
        }
    });
});


function exitHandler() {
    console.log("Writing configs to file");
    fs.writeFileSync('../configs/config.json', JSON.stringify(global.configs));
    process.exit()
}

process.on('SIGINT', exitHandler);