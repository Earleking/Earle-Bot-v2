mp = require('./musicPlayer');
module.exports.musicPlayer = new mp();

imgur = require('../API/ImgurAPI');
module.exports.iAPI = new imgur();

catPics = require('./autoCatPics');
module.exports.catSender = new catPics(null);
