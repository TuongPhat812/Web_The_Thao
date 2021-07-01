const Product = require('../models/Product')
const User = require('../models/User')
const Invoice = require('../models/Invoice')
const Contact = require('../models/Contact')
class AdminController {
    //[GET]: /admin - Hiển thị giao diện trang admin
    getInfo(req, res, next) {
        //Lấy ra user nếu đã đăng nhập thành công
        const authUser = res.locals.user;



        if (authUser.userName) {
            console.log(authUser)
            res.render('User', {
                authUser
            })
        } else {
            res.redirect('/')
        }
    }

    //[GET]: /admin/users - Hiển thị toàn bộ user
    getUsers(req, res, next) {
        const authUser = res.locals.user;
        //if(authUser.role){
        User.find({})
            .then(users => {
                users = users.map(user => user.toObject())

                res.render("admins/Admin_UserView", { authUser, users })
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

    editUser(req, res, next) {
        const authUser = res.locals.user;
        // if (authUser.userName == undefined) res.send('No permission')
        res.render('EditUser', { authUser })
    }
    getPurchaseHistory(req, res, next) {
        const authUser = res.locals.user;
        // if (authUser.userName == undefined) res.send('No permission')
        res.render('History', { authUser })
    }
    changePass(req, res, next) {
        const authUser = res.locals.user;
        // if (authUser.userName == undefined) res.send('No permission')
        res.render('Change_password', { authUser })
    }
}

module.exports = new AdminController();