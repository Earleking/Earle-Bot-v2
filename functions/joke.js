const bFunction = require('./bFunction');
const Reddit = require('../API/redditApi');
const reddit = new Reddit();
// reddit = reddit.reddit;
class joke extends bFunction {
    run(msg, args) {
        // Args should be up to one number indicating number of jokes to return
        reddit.jokesJson((data) => {
            var nJokes = 1;
            if (args[0] != undefined) {
                
                nJokes = parseInt(args[0]);
            }
            try {
                var items = data['data']['children'];
                var item, text, title;
                for (i = 0; i < nJokes; i ++) {
                    // Get data for msg
                    item = items[Math.floor(Math.random() * items.length)]['data'];
                    text = item['selftext'];
                    title = item['title'];

                    // Send msg
                    msg.channel.send({embed: {
                        title: title,
                        url: item['url'],
                        description: text
                    }});
                }
            } catch (error) {
                console.log("an error occured: " + error );
            }
            
        });
    }
    args() {
        return "<number of jokes>"
    }
}

module.exports = joke;