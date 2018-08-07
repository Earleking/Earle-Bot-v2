const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');
class summon extends bFunction {
    run(msg, args) {
        extensions.musicPlayer.joinChannel(msg);
    }
    argsList() {
        return "None";
    }
}

module.exports = summon;