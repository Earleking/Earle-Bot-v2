const bFunction = require('./bFunction');
const extensions = require('../extensions/extensions');
const ytdl = require('ytdl-core');
const request = require('request');
class play extends bFunction {
    run(msg, args) {
        // Check that an argument is passed
        var song = msg.content.split(' ', 2)[1];
        if(song == undefined) {
            msg.channel.send("Argument is required");
            return;
        }
        // is a youtube video
        if(song.startsWith('https://www.youtube.com/watch')) {
            // Split into parameters
            var params = song.split('?')[1].split('&');
            if(params.length == 1) {
                // Only one parameter meaning a single video
                this.singleYtVideo(song, msg);
            }
            else {
                this.playPlaylist(params, msg);
            }
            
        }
        else {
            // is a name
            this.playSongByName(song, msg)
        }
    }

    playSongByName(name, msg) {
        var host = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&videoCategoryId=10&videoType=any&q="
        request(host + name + "&key=" + process.env.GOOGLE_KEY, (err, res, data) => {
            console.log(err);
            data = JSON.parse(data);
            console.log(data);
            var song = "https://www.youtube.com/watch?v=" + data["items"][0]["id"]["videoId"];
            this.singleYtVideo(song, msg);
        });
        
    }

    singleYtVideo(song, msg) {
        // Is a link
        try {
            var file;
            console.log(song);
            ytdl.getInfo(song, (err, info) => {
                console.log(err);
                // Huh, not working right now? Could not extract signature deciphering actions error
                file = ytdl.downloadFromInfo(info);
                console.log(info['title']);
                extensions.musicPlayer.addSong(file, info['title'], msg);
            });
            // var file = ytdl(song, {filter: 'audioonly'});
        } catch (error) {
            console.log(error);
            msg.channel.send("Error occured with link. Confirm link and try again");
        }
    }

    YtPlaylist(playlistId, msg) {
        var host = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=30&playlistId=";
        request(host + playlistId + "&key=" + process.env.GOOGLE_KEY, (err, res, data) => {
            var list = JSON.parse(data)["items"];
            // console.log(list);
            for(i in list) {
                var item = list[i];
                // console.log(list["i"]);
                var title, id;
                id = item["snippet"]["resourceId"]["videoId"];
                // title = item["snippet"]["title"];
                var song = "https://www.youtube.com/watch?v=" + id; 
                console.log(song);
                this.singleYtVideo(song, msg);
            }
            // console.log("done");
        });
    }

    playPlaylist(params, msg) {
        var playlistId;
        // ELse has other parameters like list for a playlist
        for (i in params) {
            var param = params[i];
            try {
                if(param.split("=")[0] == "list") {
                    // then get playlist id
                    playlistId = param.split("=")[1];
                }
            } catch (error) {
                console.log(error);
                msg.channel.send("There was an error with the link");
                return;
            }
        }
        if(!playlistId) {
            // No list parameter was found
            msg.channel.send("Error with the link. Contact Earleking for help");
            return;
        }
        msg.channel.send("Adding playlist to queue");
        this.YtPlaylist(playlistId, msg);
    }

    argsList() {
        return "<songName or songLink>";
    }

    descrip() {
        return "Searchs for provided song/playlist and adds them to queue";
    }
}

module.exports = play;