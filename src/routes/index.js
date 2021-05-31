const homeRouter = require('./home');
const productRouter = require('./product');
const adminRouter = require('./admin')
function route(app) {

    //app.use('/home', homeRouter);
    //app.use('/news', homeRouter);

    app.use('/products', productRouter)
    app.use('/admin', adminRouter)
    app.use('/', homeRouter);
}

module.exports = route;