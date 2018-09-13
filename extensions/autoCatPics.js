const fs = require('fs');
class autoCatPics {
    constructor(client) {
        this.toRun = false;
        this.client = client;
        this.users = [];
    }

    setNewClient(client) {
        this.client = client;
    }

    start()  {
        // Start running
        this.toRun = true;
        this.fetchUsers((users) => {
            // Populate Users list
            this.users = users;
            // Start puctures loop
            this.sendPicsLoop();
        });
    }

    stop() {
        this.toRun = false;
    }

    updateUsers() {
        this.fetchUsers((users) => {
            // Populate Users list
            this.users = users;
        });
    }

    sendPicsLoop() {
        setTimeout(() => {
            this.sendPics();
            this.sendPicsLoop();
        }, 1000);
        // 86400 seconds is one day
    }

    sendPics() {   
        var direc = "C:/Users/Arek Fielding/Pictures/Backgrounds/"
        fs.readdir(direc, (err, files) => {
            if(err) {
                console.log("ahh");
                return;
            }
            var fileName = this.chooseARandomPicture(files);
            for(var user in this.users) {
                this.client.fetchUser(this.users[user])
                .then(user => {
                    user.send({
                        files: [direc + fileName]
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            }
        });
    }

    chooseARandomPicture(files) {
        var index = Math.floor(Math.random() * files.length)
        return files[index];
    }

    fetchUsers(callback) {
        if(this.client == null) {
            return;
        }
        fs.readFile("./static/catPictureUsers.txt", "utf8", (error, response) => {
            if(error)
                console.log(error);
            response = response.replace("\r", "");
            callback(response.split("\n"));
        });
    }
}

module.exports = autoCatPics;