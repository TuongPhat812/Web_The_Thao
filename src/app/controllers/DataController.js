const Product = require('../models/Product')
const User = require('../models/User')
const Invoice = require('../models/Invoice')
const Contact = require('../models/Contact')
class HomeController {
    //[GET]: /admin - Hiển thị giao diện trang admin
    renderUsers(req, res, next) {
        Promise.all([
            User.find({})
        ])
        .then(users => 
            {res.json(users)}
        )
        .catch(next)
    }

    renderProducts(req, res, next) {
        Promise.all([
            Product.find({})
        ])
        .then(products => 
            {res.json(products)}
        )
        .catch(next)
    }


    
}

module.exports = new HomeController();