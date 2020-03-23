
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema,
    SALT_WORK_FACTOR = 10;


var schema = new Schema({
    username: { type: String, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: { type: Boolean},
    provider: {type: String},
    token: {type: String},
    createdDate: { type: Date, default: Date.now }
});

schema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};



mongoose.model('User', schema);
module.exports = mongoose.model('User');