const Product = require('../models/Product')
const User = require('../models/User')
class HomeController {
    //[GET]: /
    index(req, res, next) {

        //Lấy ra user nếu đã đăng nhập thành công
        const user = res.locals.user;

        //Load sản phẩm hot và mới nhất
        Promise.deleteO
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
                    user
                });
            })
            .catch(next)
    }

    //[POST]: /login
    login(req, res, next) {
        User.findOne({
                username: req.body.username,
                password: req.body.password
            })
            .then(user => {
                if (user) {
                    req.session.userName = user.username;
                    req.session.email = user.email;
                    req.session.fullname = user.fullname;
                    req.session.sdt = user.sdt;
                    req.session.diaChi = user.diachi;
                    res.redirect('/')
                } else {
                    req.session.userName = undefined

                    res.render('Dangnhap',{message: 'Not found'})
                }
            })
            .catch(next)
    }

    //[POST]: /logout
    logout(req, res, next) {
        req.session.userName = undefined
        req.session.email = undefined
        req.session.fullname = undefined
        req.session.sdt = undefined
        req.session.diaChi = undefined
        res.redirect('/')
    }

    //[POST]: /register
    register(req, res, next) {
        
        User.findOne({
                username: req.body.username,
            })
            .then(user => {
                if (user) {
                    console.log("Username has already existed" + user.username)
                    res.render('Dangky', { message: 'Tên đăng nhập đã tồn tại' })
                } else {
                    const user = new User({
                        _id: Math.random(),
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
    dangnhap(req, res, next) {
        res.render('Dangnhap')
    }

    //[GET]: /register - di chuyển tới form đăng ký
    dangky(req, res, next) {
        res.render('Dangky')
    }

    // products(req, res, next) {
    //     // const idProduct = req.params['id']
    //     // console.log(idProduct)
    //     res.render('HomeView')
    // }
}

module.exports = new HomeController();