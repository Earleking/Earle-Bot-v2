class songQueue {
    constructor(musicPlayer) {
        this.queue = [];
        this.nameQueue = [];
        this.mP = musicPlayer;
    }

    addSong(song, name="No Name") {
        this.queue.push(song);
        this.nameQueue.push(name);
        if(!this.mP.isPlaying) {
            this.mP.play();
        }
    }

    clearSongs() {
        this.queue = [];
        this.nameQueue = [];
    }

    viewQueue() {
        return this.nameQueue;
    }

    getFirstSong() {
        if(this.queue.length == 0) {
            return -1;
        }
        var song = this.queue[0];
        var name = this.nameQueue[0];
        this.queue.shift();
        this.nameQueue.shift();
        return [name, song];
    }

    peekFirstSong() {
        if(this.queue.length == 0)  {
            return -1;
        }
        return [this.nameQueue[0], this.queue[0]];
    }
}

module.exports = songQueue;