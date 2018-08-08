const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');
class imgur extends bFunction {
    run(msg, args) {
        var search = "aww";
        if(args[0]) {
            search = args[0];
        }
        extensions.iAPI.getImageFromSubReddit(search, (link) => {
            msg.channel.send(link);
        });
    }

    argsList() {
        return "(subreddit name)";
    }

    descrip() {
        return "Returns a random image from the subreddit specified. Or aww";
    }
}

module.exports = imgur;