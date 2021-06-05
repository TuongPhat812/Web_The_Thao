const Product = require('../models/Product')
const User = require('../models/User')
const Invoice = require('../models/Invoice')
const Contact = require('../models/Contact')
class AdminController {
    //[GET]: /admin - Hiển thị giao diện trang admin
    index(req, res, next) {
        //Lấy ra user nếu đã đăng nhập thành công
        const authUser = res.locals.user;
        let count = {
            users: 0,
            products: 0,
            invoices: 0,
            contacts: 0,
        }
        User.countDocuments({}).then(total => {count.users = total}).catch(next)
        Product.countDocuments({}).then(total => {count.products = total}).catch(next)
        Invoice.countDocuments({}).then(total => {count.invoices = total}).catch(next)
        Contact.countDocuments({}).then(total => {count.contacts = total}).catch(next)

        //if (authUser.role) {
            res.render('admins/index', {
                authUser,
                count
            })
        // } else
        //     res.redirect('/')
    }

    //[GET]: /admin/users - Hiển thị toàn bộ user
    getUsers(req, res, next) {
        const authUser = res.locals.user;
        //if(authUser.role){
            User.find({})
            .then(users => {
                users = users.map(user => user.toObject())

                res.render("admins/Admin_UserView", { authUser, users})
            })
            .catch(next)
        //}
        // else
        //     res.redirect('/')
        
    }
    
    getUser(req, res, next) {
        const authUser = res.local.user
        User.find({
                username: req.params.username
            })
            .then(user => {
                user = user.toObject()
                res.render('/', {
                    authUser,
                    user
                })
            })
            .catch(next)


    }
}

module.exports = new AdminController();