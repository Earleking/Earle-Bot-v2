const bAFunction = require("./bAutoFunction");

class greeter extends bAFunction {
    constructor(client) {
        this.client = client;
        this.run = false;

        this.client.on("guildMemberAdd", member => {
            if(!this.run) {
                return;
            }
            const channel = member.guild.channels.find(ch => ch.name === 'general');
            if (!channel) return;
            channel.send("Hello " + member);
        });
    }

    start() {
        this.run = true;
    }

    stop() {
        this.run = false;
    }
}

module.exports = greeter;