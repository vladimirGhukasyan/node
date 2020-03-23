var mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) { //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
    User.findOne({_id: id}, function (err, user) {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({email: email}, function (err, user) {

            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'This email is not registered'});
            }


            user.comparePassword(password,function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    })
);

module.exports = passport;

// var user = new User({ username: 'vladghukas', email: 'vlad.ghukas@gmail.com',password: 123456,isAdmin:true })
// user.save();