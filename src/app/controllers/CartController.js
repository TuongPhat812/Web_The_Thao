class CartController {
    index(req, res, next) {
        const authUser = res.locals.user;
        res.render('CartView', {
            authUser
        });
    }

    getCartDetailView(req, res, next) {
        const authUser = res.locals.user;
        res.render('CartDetailView', {
            authUser
        });
    }
}
module.exports = new CartController();