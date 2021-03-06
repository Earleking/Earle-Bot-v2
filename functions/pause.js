const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');

class pause extends bFunction {
    run(msg, args) {
        extensions.musicPlayer.pause(msg);
    }
    argsList() {
        return "None";
    }
    descrip() {
        return "Attempts to pause music";
    }
}

module.exports = pause;