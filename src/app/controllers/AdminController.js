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
                console.log("old: " + __dirname)
                console.log("new: " + __dirname.slice(0, __dirname.indexOf("\\app\\controllers")))
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
    getEditUser(req,res,next){

        const username = req.query.username
        console.log(username)

        User.findOne({username})
        .then(user => {
            console.log(user)
            user = user.toObject()
            res.render("admins/Admin_EditUserView", {user})
        })
        .catch(next)
        

    }
    postEditUser(req,res,next){

        const user = {
            _id: Number(req.body.id),
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            sdt: req.body.sdt,
            diachi: req.body.diachi,
            isadmin: Number(req.body.role),
            }
        console.log(user)

        User.updateOne({_id: user._id,username: user.username}, {
            fullname: user.fullname, 
            email: user.email, 
            sdt: user.sdt, 
            diachi: user.diachi, 
            isadmin:user.isadmin})
        .then(() => {
            
            res.redirect('/admin/users')
        })
        .catch(next)
        

    }
    postDeleteUser(req,res,next){

        User.deleteOne({username: req.body.username})
        .then(() => {
            res.redirect('/admin/users')
        })
        .catch(next)
        

    }

    getProducts(req,res,next){

        Product.find({})
        .then((products) => {
            products = products.map(product => product.toObject())
            res.render("admins/Admin_ProductsView")
        })
        .catch(next)
        

    }
}

module.exports = new AdminController();