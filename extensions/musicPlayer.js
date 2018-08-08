var queue = require('./songQueue');

class musicPlayer {
    constructor() {
        this.currentSong;
        this.voiceChannel;
        this.connection;
        this.songQueue = new queue(this);
        this.textChannel;
        this.dispatcher;
    }

    joinChannel(msg) {
        try {
            this.textChannel = msg.channel;
            this.voiceChannel = msg.member.voiceChannel;
            if(this.voiceChannel == undefined) {
                // this.voiceChannel = 
                return this.sendMessage(msg, "Please join a voice channel first");
                
            }
            this.voiceChannel.join()
            .then(connection => {this.connection = connection;})
            .catch(console.error);
            this.connection = this.voiceChannel.connection;
        } catch (error) {
            this.voiceChannel = undefined;
            this.connection = undefined;
        }
    }

    leaveChannel(msg) {
        try {
            if(!this.voiceChannel) {
                return this.sendMessage(msg, "Not currently in a voice channel");
            }
            // Leave and reset variables
            this.clearQueue();
            this.connection = undefined;
            this.voiceChannel.leave();
        } catch (error) {
            
        }
    }

    get isPlaying() {
        if(!this.dispatcher) {
            return false;
        }
        return !this.dispatcher.paused;
    }

    addSong(song, songName = "No name", msg = undefined) {
        
        if(!this.voiceChannel || !this.connection) {
            if(msg) {
                this.joinChannel(msg);
            }
            return this.sendMessage(msg, "Not currently in a voice channel");
        }

        if(msg) {
            this.textChannel = msg.channel;
        }
        this.songQueue.addSong(song, songName);
        this.sendMessage(msg, "Song " + songName + "added to queue");
        if (!this.isPlaying)
            this.play();
    }

    play(msg = undefined) {
        if(!this.voiceChannel || !this.connection) {
            return this.sendMessage(msg, "Not currently in a voice channel");
        }
        if(this.currentSong) {
            return;
        }
        this.currentSong = this.songQueue.getFirstSong();
        if(this.currentSong == -1) {
            return this.sendMessage(msg, "End of queue reached");
        }
        // Play song
        // console.log(this.currentSong);
        this.dispatcher = this.connection.playStream(this.currentSong[1]);
        this.createDispatcher();
    }

    createDispatcher() {
        this.dispatcher.on('start', () => {
            this.sendMessage(undefined, "Now playing " + this.currentSong[0]);
        });
        this.dispatcher.on('end', (reason) => {
            this.currentSong = undefined;
            this.play();
        });
    }

    resume(msg = undefined) {
        if(!this.voiceChannel) {
            return this.sendMessage(msg, "Not currently in a voice channel");
        }
        if(!this.dispatcher) {
            return this.sendMessage(msg, "No song is playing");
        }
        // pause song
        if(this.isPlaying) {
            return this.sendMessage(msg, "Song is already playing");
        }
        this.dispatcher.resume();
    }

    pause(msg = undefined) {
        if(!this.voiceChannel) {
            return this.sendMessage(msg, "Not currently in a voice channel");
        }
        if(!this.dispatcher) {
            return this.sendMessage(msg, "No song is playing");
        }
        // pause song
        if(!this.isPlaying) {
            return this.sendMessage(msg, "Song is already paused");
        }
        this.dispatcher.pause();
    }

    get playing() {
        return this.currentSong[0];
    }

    skip(msg = undefined) {
        if(!this.voiceChannel) {
            return this.sendMessage(msg, "Not currently in a voice channel");
        }
        if(!this.currentSong) {
            return this.sendMessage(msg, "No song is playing");
        }
        // Skip song

        // 
        this.currentSong = undefined;
        this.play();
    }
    
    clearQueue(msg = undefined) {
        if(!this.voiceChannel) {
            return this.sendMessage(msg, "Not currently in a voice channel");
        }
        this.songQueue.clearSongs();
    }

    songsInQueue() {
        return this.songQueue.viewQueue();
    }

    sendMessage(msg = undefined, strMsg) {
        if(msg) {
            try {
                msg.channel.send(strMsg);
            } catch (error) {
                return -1;
            }
        }
        if(this.textChannel) {
            try {
                this.textChannel.send(strMsg);
            } catch (error) {
                return -1;
            }
        }
        return -1;
    }

    

}

module.exports = musicPlayer;