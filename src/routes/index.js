const homeRouter = require('./home');

function route(app) {

    app.use('/home', homeRouter);
    app.use('/news', homeRouter);
    app.use('/', homeRouter);

}

module.exports = route;