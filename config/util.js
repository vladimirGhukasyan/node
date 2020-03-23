var crypto = require('crypto');


module.exports = {

    encrypt: function (plainText) {
        return crypto.createHash('md5').update(plainText).digest('hex');
    },
};


