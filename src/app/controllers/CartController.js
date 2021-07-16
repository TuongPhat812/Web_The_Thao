const Product = require('../models/Product')
const Invoice = require('../models/Invoice')
const InvoiceDetail = require('../models/InvoiceDetail')
const { Error } = require("mongoose");
const User = require('../models/User')
class CartController {
    index(req, res, next) {
        const authUser = res.locals.user;
        res.render('CartView', {
            authUser
        });
    }

    getCartDetailView(req, res, next) {
        const authUser = res.locals.user;
        const id_invoice = req.query.id_invoice;
        console.log(id_invoice)
        if (id_invoice != undefined) {
            Invoice.find({ _id: id_invoice }).then(invoice => {
                invoice = invoice.map(invoice => invoice.toObject())
                Promise.all([
                        User.find({ _id: authUser._id }),
                        InvoiceDetail.find({ id_donhang: id_invoice }),
                    ])
                    .then(([
                        user,
                        invoiceDetail
                    ]) => {
                        user = user.map((user) => user.toObject());
                        var products = []
                        invoiceDetail.forEach(element => {


                        });
                        console.log(products)
                    })
                    .catch(next);
            })


        }
        res.render('CartDetailView', {
            authUser
        });
    }
}
module.exports = new CartController();