const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');
class banish extends bFunction {
    run(msg, args) {
        extensions.musicPlayer.leaveChannel(msg);
    }
    argsList() {
        return "None";
    }
}

module.exports = banish;