var ArticleService = require('../services/article.services')
var i18n = require("i18n");

exports.index = async function (req, res, next) {

    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;

    try {
        var articles = await ArticleService.getArticles({}, page, limit)
        res.render('admin/articles/index', {title: 'Articles', layout: 'admin/layout', articles: articles});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.create = async function (req, res, next) {
    var languages = i18n.getLocales();
    res.render('admin/articles/create', { title: 'Articles Create',languages:languages,layout: 'admin/layout' });
};