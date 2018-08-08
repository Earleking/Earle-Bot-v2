const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');
class summon extends bFunction {
    run(msg, args) {
        extensions.musicPlayer.joinChannel(msg);
    }
    argsList() {
        return "None";
    }
    descrip() {
        return "Attempts to summon bot to current channel";
    }
}

module.exports = summon;