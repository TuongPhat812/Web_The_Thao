const News = require('../models/News')

class NewController {
    index(req, res, next) {
        const authUser = res.locals.user;
        News.find({})
            .then(news => {
                news = news.map(news => news.toObject());
                res.render('SumBlogView', { authUser, news })
            })
    }
    getBlog(req, res, next) {
        const authUser = res.locals.user;
        let id = req.params.id;
        id = isNaN(id) ? '' : parseInt(id);
        // console.log(id)
        News.find({ _id: id })
            .then(news => {
                news = news.map(news => news.toObject());
                // console.log(news)
                res.render('BlogView', { authUser, news })
            })
    }
}
module.exports = new NewController()