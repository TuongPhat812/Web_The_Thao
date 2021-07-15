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
        .then(products => {
            let cloneProducts = []
            let index = 0
            products[0].forEach(product => {
                cloneProducts[index] = {
                    _id: product._id,
                    ten_sanpham: product.ten_sanpham,
                    anh_sanpham: product.anh_sanpham,
                    gia: product.gia,
                }
                index++
            })
            res.json(cloneProducts)
        }

        )
        .catch(next)
    }


    
}

module.exports = new HomeController();