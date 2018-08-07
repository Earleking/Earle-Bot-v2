const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');

class resume extends bFunction {
    run(msg, args) {
        extensions.musicPlayer.resume(msg);
    }
    argsList() {
        return "None";
    }
}

module.exports = resume;