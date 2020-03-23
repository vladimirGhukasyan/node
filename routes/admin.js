var express = require('express');
var router = express.Router();
var adminMiddleware = require('../middlewares/admin');
var ArticleController = require('../controllers/articles.controller');


router.get('/articles',ArticleController.index);

router.get('/articles/create', ArticleController.create);

module.exports = router;
