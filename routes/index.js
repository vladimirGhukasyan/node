var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var adminRoutes = require('./admin');
var User = mongoose.model('User');
const passport = require('passport');

const {check, validationResult} = require('express-validator');


router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'Home',
    });
});


router.get('/login', function (req, res, next) {

    res.render('auth/login', {
        title: 'Login',
        auth: req.user,
        errors: req.flash('error')
    });
    req.session.errors = null;
});
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/login')
});

router.get('/registration', function (req, res, next) {
    res.render('auth/registration', {
        title: 'Registration',
        errors: req.session.errors
    });
    req.session.errors = null;
});


router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }),
    function (req, res, next) {
        res.redirect('/login')

    });

router.post('/registration', [
    check('email', 'Email is required').isEmail().custom(value => {
        return User.findOne({email: value}).then((user) => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6, max: 12}).withMessage('Password must be between 6-12 characters long'),
    check('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
], (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
            username: req.body.email.split('@')[0]
        }).then(user => {});
    }

    req.session.errors = errors.array();
    res.redirect('/registration')


});

router.get('/contact', function (req, res, next) {
    res.render('contact', {title: 'Contact'});
});


router.use('/admin', adminRoutes);


module.exports = router;
// [
//     check('email', 'Email is required')
//         .isEmail(),
//     check('password', 'Password is required')
//         .isLength({min: 6}),
// ]