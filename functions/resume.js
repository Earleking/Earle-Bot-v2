const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');

class resume extends bFunction {
    run(msg, args) {
        extensions.musicPlayer.resume(msg);
    }
    argsList() {
        return "None";
    }
    descrip() {
        return "Attempts to resume music";
    }
}

module.exports = resume;