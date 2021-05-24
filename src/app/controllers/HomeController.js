const Product = require('../models/Product')
const User = require('../models/User')
class HomeController {
    // GET /home
    index(req, res, next) {

        const user = res.locals.user;

        //Load sản phẩm hot
        //load san pham moi
        Promise.all([Product.find({ sanpham_hot: 1 }), Product.find({ ngaydang: "2020-12-17" })])
            .then(([products_hot, products_new]) => {
                products_hot = products_hot.map(product_hot => product_hot.toObject());
                products_new = products_new.map(product_new => product_new.toObject());
                res.render('HomeView', { products_hot, products_new, user });
            })
            .catch(next)
    }

    //[POST] login
    //Dùng mongodb với thư viện mongoose
    //session phiên này nó sẽ
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
                    res.redirect('/login')

                }
                return "Hello"
            })
            .then(LoiChao => { console.log(LoiChao) })
            .catch(next)
            //m dừng cái gì
            //đù, t tưởng m chỉ đang thực hành cho t, cái đó t hiểu nên ok. chứ có nghe m nói gì đâu, thôi để t gọi lại trên lap

    }
    logout(req, res, next) {

        req.session.userName = undefined
        req.session.email = undefined
        req.session.fullname = undefined
        req.session.sdt = undefined
        req.session.diaChi = undefined
        res.redirect('/')

    }



    register(req, res, next) {
        User.findOne({
                username: req.body.username,
            })
            .then(user => {
                if (user) {
                    console.log("Username has already existed" + user.username)
                    res.redirect('/')
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
                }

                res.redirect('/')
            })
            .catch(next)
    }
    test(req, res, next) {

        if (req.session.userName) {
            res.render('HomeView')
            console.log(req.session.userName);
        } else

        {
            res.render('HomeView')
            console.log("No thing");
        }
    }
    dangnhap(req, res, next) {

        res.render('Dangnhap')
    }
    dangky(req, res, next) {

        res.render('Dangky')
    }
    product(req, res, next) {
        const idProduct = req.params['id']
        console.log(idProduct)
        res.render('HomeView')
    }

}

module.exports = new HomeController();
//