var express = require('express');
var router = express.Router();
var adminMiddleware = require('../middlewares/admin');

router.get('/articles', function(req, res, next) {
    res.render('admin/articles/index', { title: 'Articles',layout: 'admin/layout' });
});
router.get('/articles/create', function(req, res, next) {
    res.render('admin/articles/create', { title: 'Articles Create',layout: 'admin/layout' });
});

module.exports = router;
