const Product = require('../models/Product')
const User = require('../models/User')
class HomeController {
    //[GET]: /
    index(req, res, next) {

        //Lấy ra user nếu đã đăng nhập thành công
        const user = res.locals.user;
        
        
        
            
        //Load sản phẩm hot và mới nhất
        if(user.role)
        {
            Promise.all([
                // 
                Product.find({}),
                User.find({})
            ])
            .then(([products, users]) => {
                    products = products.map(product => product.toObject())
                    users = users.map(user => user.toObject())

                    res.render('admin/AdminView', {products, users})
                }
            )
            
            .catch(next)
            
        }
        else
            res.redirect('/')

    }
}

module.exports = new HomeController();