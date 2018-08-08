const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');

class queue extends bFunction {
    run(msg, args) {
        console.log(extensions.musicPlayer.songsInQueue());
    }
    argsList() {
        return "None";
    }
    descrip() {
        return "Displays the songs currently in queue";
    }
}

module.exports = queue;