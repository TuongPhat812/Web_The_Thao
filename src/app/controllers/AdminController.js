const Product = require('../models/Product')
const User = require('../models/User')
const Invoice = require('../models/Invoice')
const Contact = require('../models/Contact')
const formidable = require('formidable')
const fs = require('fs');
class AdminController {
    //[GET]: /admin - Hiển thị giao diện trang admin
    index(req, res, next) {
        //Lấy ra user nếu đã đăng nhập thành công
        const authUser = res.locals.user;
        if (authUser.role == 0 || authUser.role == undefined)
            res.redirect('/')

        let count = {
            users: 0,
            products: 0,
            invoices: 0,
            contacts: 0,
        }
        User.countDocuments({}).then(total => {
            count.users = total
        }).catch(next)
        Product.countDocuments({}).then(total => {
            count.products = total
        }).catch(next)
        Invoice.countDocuments({}).then(total => {
            count.invoices = total
        }).catch(next)
        Contact.countDocuments({}).then(total => {
            count.contacts = total
        }).catch(next)


        res.render('admins/index', {
            authUser,
            count
        })
    }

    //[GET]: /admin/users - Hiển thị toàn bộ user
    getUsers(req, res, next) {
        const authUser = res.locals.user;

        if (authUser.role == 0 || authUser.role == undefined)
            res.redirect('/')
        User.find({})
            .then(users => {

                users = users.map(user => user.toObject())

                res.render("admins/Admin_UserView", {
                    authUser,
                    users
                })
            })
            .catch(next)
    }

    getUser(req, res, next) {
        const authUser = res.local.user
        if (authUser.role == 0 || authUser.role == undefined)
            res.redirect('/')
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
    getEditUser(req, res, next) {
        const authUser = res.locals.user
        if (authUser.role == 0 || authUser.role == undefined)
            res.redirect('/')
        const username = req.query.username
        console.log(username)

        User.findOne({
                username
            })
            .then(user => {
                console.log(user)
                user = user.toObject()
                res.render("admins/Admin_EditUserView", {
                    user
                })
            })
            .catch(next)


    }
    postEditUser(req, res, next) {
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

        User.updateOne({
                _id: user._id,
                username: user.username
            }, {
                fullname: user.fullname,
                email: user.email,
                sdt: user.sdt,
                diachi: user.diachi,
                isadmin: user.isadmin
            })
            .then(() => {

                res.redirect('/admin/users')
            })
            .catch(next)
    }
    postDeleteUser(req, res, next) {
        User.deleteOne({
                username: req.body.username
            })
            .then(() => {
                res.redirect('/admin/users')
            })
            .catch(next)
    }

    getProducts(req, res, next) {

        const authUser = res.locals.user;
        if (authUser.role == 0 || authUser.role == undefined)
            res.redirect('/')
        Product.find({})
            .then((products) => {
                products = products.map(product => product.toObject())
                res.render("admins/Admin_ProductsView", {
                    authUser,
                    products
                })
            })
            .catch(next)
    }

    getCreateProduct(req, res, next) {

        const authUser = res.locals.user;
        if (authUser.role == 0 || authUser.role == undefined)
            res.redirect('/')
        res.render("admins/Admin_CreateProductView", {
            authUser
        })
    }

    postCreateProduct(req, res, next) {
        const authUser = res.locals.user;

        let idProduct = Math.round(Math.random() * 1000000);

        while (!Product.findOne({
                _id: idProduct
            })) {
            idProduct = Math.round(Math.random() * 1000000);
        }
        const product = new Product({
            _id: idProduct,
            id_danhmuc: Number(req.body.id_danhmuc),
            ten_sanpham: req.body.ten_sanpham,
            gia: req.body.gia,
            gia_km: req.body.gia_km,
            mota: req.body.mota,
            anh_sanpham: ""
        })
        product.save()
        res.redirect('/admin/products')
    }

    getEditProduct(req, res, next) {
        const authUser = res.locals.user;
        if (authUser.role == 0 || authUser.role == undefined)
            res.redirect('/')
        let id = req.query.id

        Product.findOne({
                _id: id
            })
            .then((product) => {
                product = product.toObject()
                res.render("admins/Admin_EditProductView", {
                    authUser,
                    product
                })
            })
            .catch(next)
    }

    postEditProduct(req, res, next) {
        const authUser = res.locals.user;


        Product.updateOne({
                _id: req.body.id
            }, {
                id_danhmuc: req.body.id_danhmuc,
                ten_sanpham: req.body.ten_sanpham,
                gia: req.body.gia,
                mo_ta: req.body.mo_ta,
                gia_km: req.body.gia_km,
            })
            .then(() => res.redirect('/admin/products'))
            .catch(next)
    }

    postEditImgProduct(req, res, next) {
        const authUser = res.locals.user;

        let id = Number(req.params.id)
        let pathToSave;
        let pathFolder = __dirname.slice(0, __dirname.indexOf("\\app\\controllers")) + "\\public\\images\\images_sp\\"
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fields, files) {
            const oldpath = files.filetoupload.path;
            const newpath = pathFolder + files.filetoupload.name;
            console.log(newpath)
            pathToSave = "images\\images_sp\\" + files.filetoupload.name
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
            })
            console.log("path" + pathToSave)
            Product.updateOne({
                    _id: id
                }, {
                    anh_sanpham: pathToSave
                })
                .then(() => res.redirect('/admin/products'))
                .catch(next)
        })
    }


    postDeleteProduct(req, res, next) {
        const authUser = res.locals.user;
        let id = req.body.id
        Product.deleteOne({
                _id: id
            })
            .then(() => res.redirect('/admin/products'))
            .catch(next)
    }
}

module.exports = new AdminController();