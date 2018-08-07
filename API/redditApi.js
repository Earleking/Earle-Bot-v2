const request = require('request');

function reddit() {
    this.jokesJson = function(callback) {
        request('https://www.reddit.com/r/jokes.json', (err, res, data) => {
            callback(JSON.parse(data));
        });
    }
}

module.exports = reddit;
