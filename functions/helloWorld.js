bFunction = require('./bFunction');

class helloWorld extends bFunction {

    run(msg, args) {
        msg.channel.send("Hello World");
    }
    argsList() {
        return "";
    }
}

module.exports = helloWorld;