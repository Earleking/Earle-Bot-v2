const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');

class queue extends bFunction {
    run(msg, args) {
        console.log(extensions.musicPlayer.songsInQueue());
    }
    argsList() {
        return "None";
    }
}

module.exports = queue;