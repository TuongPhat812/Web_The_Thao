const Product = require('../models/Product')
const User = require('../models/User')
class HomeController {
    //[GET]: / - Di chuyển đến trang chủ
    index(req, res, next) {

        // User đã đăng nhập là Authentication User
        const authUser = res.locals.user;

        //Load sản phẩm hot và mới nhất
        Promise.all([
                // 
                Product.find({ sanpham_hot: 1 }),
                Product.find({ ngaydang: "2020-12-17" }),
                Product.find({ gia_km: { $exists: true } }),
            ])
            .then(([
                products_hot,
                products_new,
                products_km,
            ]) => {
                products_hot = products_hot.map(product_hot => product_hot.toObject());
                products_new = products_new.map(product_new => product_new.toObject());
                products_km = products_km.map(products_km => products_km.toObject());

                res.render('HomeView', {
                    products_hot,
                    products_new,
                    products_km,
                    authUser
                });
            })
            .catch(next)
    }

    //[POST]: /login - Thực hiện chức năng đăng nhập
    postLogin(req, res, next) {
        User.findOne({
                username: req.body.username,
                password: req.body.password
            })
            .then(user => {
                if (user) {
                    req.session.userName = user.username;
                    req.session.password = user.password;
                    req.session.email = user.email;
                    req.session.fullname = user.fullname;
                    req.session.sdt = user.sdt;
                    req.session.diaChi = user.diachi;
                    req.session.role = user.isadmin;
                    res.redirect('/')
                } else {

                    res.render('Dangnhap', { message: 'User not found' })
                }
            })
            .catch(next)
    }

    //[GET]: /logout - Đăng xuất | di chuyển về trang chủ
    getLogout(req, res, next) {
        req.session.userName = undefined
        req.session.email = undefined
        req.session.fullname = undefined
        req.session.sdt = undefined
        req.session.diaChi = undefined
        req.session.role = undefined
        res.redirect('/')
    }

    //[POST]: /register - Thực hiện chức năng đăng ký
    postRegister(req, res, next) {

        User.findOne({
                username: req.body.username,
            })
            .then(user => {
                if (user) {
                    console.log("Username has already existed" + user.username)
                    res.render('Dangky', { message: 'Tên đăng nhập đã tồn tại' })
                } else {
                    let countUser = Math.random() * 1000000;
                    console.log(countUser)
                    while (!User.findOne({ _id: countUser })) {
                        countUser = Math.ceil(Math.random() * 1000000);


                    }
                    const user = new User({
                        _id: countUser,
                        username: req.body.username,
                        password: req.body.password,
                        diachi: req.body.diachi,
                        sdt: req.body.sdt,
                        fullname: req.body.fullname,
                        email: req.body.email,
                        isadmin: 0
                    })

                    console.log(user);
                    user.save()
                    res.redirect('/')
                }
            })
            .catch(next)
    }

    //[GET]: /login - di chuyển tới form đăng nhập
    getLogin(req, res, next) {
        const authUser = res.locals.user;
        res.render('Dangnhap')
    }

    //[GET]: /register - di chuyển tới form đăng ký
    getRegister(req, res, next) {
        const authUser = res.locals.user;
        res.render('Dangky', authUser)
    }



}

module.exports = new HomeController();