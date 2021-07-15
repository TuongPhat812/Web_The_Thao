const homeRouter = require('./home');
const productRouter = require('./product');
const adminRouter = require('./admin')
const dataRouter = require('./data')
const userRouter = require('./user')
const cartRouter = require('./cart')
const newsRouter = require('./news')
const contactRouter = require('./contact')
const searchRouter =require('./search')
function route(app) {

    //app.use('/home', homeRouter);
    //app.use('/news', homeRouter);
    app.use('/search', searchRouter)
    app.use('/contact', contactRouter)
    app.use('/blog', newsRouter)
    app.use('/cart', cartRouter)
    app.use('/api', dataRouter)
    app.use('/user', userRouter)
    app.use('/products', productRouter)
    app.use('/admin', adminRouter)
    app.use('/', homeRouter);
}

module.exports = route;