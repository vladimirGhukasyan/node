var Article = require('../models/article')

exports.getArticles = async function (query, page, limit) {

    try {
        var articles = await Article.find(query)
        return articles;
    } catch (e) {

        throw Error('Error while Paginating Users')
    }
}