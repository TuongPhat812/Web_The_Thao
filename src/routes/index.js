const homeRouter = require('./home');
const productRouter = require('./product');
const adminRouter = require('./admin')
const dataRouter = require('./data')
function route(app) {

    //app.use('/home', homeRouter);
    //app.use('/news', homeRouter);


    app.use('/data', dataRouter)

    app.use('/products', productRouter)
    app.use('/admin', adminRouter)
    app.use('/', homeRouter);
}

module.exports = route;