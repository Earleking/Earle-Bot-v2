const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');
class banish extends bFunction {
    run(msg, args) {
        extensions.musicPlayer.leaveChannel(msg);
    }
    argsList() {
        return "None";
    }
    descrip() {
        return "Removes the bot from the current voice channel";
    }
}

module.exports = banish;