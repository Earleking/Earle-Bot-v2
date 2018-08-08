const bFunction = require('./bFunction');
// Add score tracing later
class rps extends bFunction {
    run(msg, args) {
        var cast = msg.content.split(' ')[1];
        if(!cast) {
            msg.channel.send("Please throw something");
            return;
        }
        
        var options = ['r', 'p', 's'];
        var dict = {'r': 'rock', 'p': 'paper', 's': 'scissors'};
        if(!dict[cast]) {
            msg.channel.send("Invalid choice");
            return;
        }
        var compCast = Math.round((Math.random() * 2.99)- 0.5);

        // 1 = human win, 2 = comp win, 3 = tie
        var winner;
        
        // tie
        if(options[compCast] == cast) {
            winner = "None";
        }
        else if(options[(compCast + 1) % 3] == cast) {
            winner = "Player";
        }
        else {
            winner = "Earle-bot";
        }
        
        msg.channel.send({embed: {
            title: "Rock, Paper, Scissors Game",
            description: "Player: " + dict[cast] + " \nEarle: " + dict[options[compCast]],
            fields: [{
                name: "Winner",
                value: winner
            }]
        }});
    }


    argsList() {
        return "<move: 'r', 'p', 's'>";
    }

    descrip() {
        return "Rock, Paper, Scissors game";
    }
}

module.exports = rps;