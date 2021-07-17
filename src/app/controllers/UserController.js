const { Error } = require("mongoose");
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
        if (authUser.userName == undefined) res.send('No permission')
        res.render('EditUser', { authUser })
    }
    getPurchaseHistory(req, res, next) {
        const authUser = res.locals.user;
        // if (authUser.userName == undefined) res.send('No permission')
        Invoice.find({ id_khachhang: authUser._id })
            .then(invoice => {
                invoice = invoice.map(invoice => invoice.toObject())
                res.render('History', { authUser, invoice })
            })
    }
    changePass(req, res, next) {
        const authUser = res.locals.user;
        if (authUser.userName == undefined) res.send('No permission')
        res.render('Change_password', { authUser })
    }
    async updateInfo(req, res, next) {
        var authUser = res.locals.user;
        const data = req.body;
        data._id = authUser._id;
        data.username = authUser.userName;
        data.password = authUser.password;
        data.isadmin = 0;
        const doc = new User(data);
        await User.deleteOne({ _id: authUser._id })
        doc.save()
            .then(doc => {
                req.session._id = doc._id;
                req.session.userName = doc.username;
                req.session.password = doc.password;
                req.session.email = doc.email;
                req.session.fullname = doc.fullname;
                req.session.sdt = doc.sdt;
                req.session.diaChi = doc.diachi;
                req.session.role = doc.isadmin;
                authUser = res.locals.user;
                res.redirect('/user/editUser')
            })
    }
    async updatePass(req, res, next) {
        var authUser = res.locals.user;
        if (authUser.password == req.body.old_password) {
            let data = authUser;
            data.password = req.body.password == req.body.password1 ? req.body.password : authUser.password;
            data.username = authUser.userName;
            data.diachi = authUser.diaChi;
            console.log(data);
            const doc = new User(data);
            await User.deleteOne({ _id: authUser._id })
            doc.save()
                .then(doc => {
                    req.session._id = doc._id;
                    req.session.userName = doc.username;
                    req.session.password = doc.password;
                    req.session.email = doc.email;
                    req.session.fullname = doc.fullname;
                    req.session.sdt = doc.sdt;
                    req.session.diaChi = doc.diachi;
                    req.session.role = doc.isadmin;
                    authUser = res.locals.user;
                    res.redirect('/user/change-pass')
                })
        }

        
    }
    
}

module.exports = new AdminController();