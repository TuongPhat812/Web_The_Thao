const Product = require('../models/Product')
const User = require('../models/User')
class HomeController {
    // GET /home
    index(req, res, next) {
        

        const authenticated = res.locals.user
        
        res.render('HomeView',{authenticated})
        // .then(function(product){
        //     res.render('HomeView')//{product: product.toObject()})
        // })
        /*.then(function(product){
            req.session.sanpham = product.ten_sanpham
            res.render('HomeView', {test: req.session.sanpham})
            
        })*/

        //.catch(next)
        //     .then(XoaSP)
        //     .then(XoaUser);
        // redirect

    }
    //[POST] login
    login(req, res, next) {
        User.findOne({
                username: req.body.username,
                password: req.body.password
            })
            .then(user => {
                if(user)
                {
                    req.session.userName = user.username;
                    req.session.email = user.email;
                    req.session.fullname = user.fullname;
                    req.session.sdt = user.sdt;
                    req.session.diaChi = user.diachi;
                    res.redirect('/')
                }
                else
                { 
                    req.session.userName = undefined
                    res.redirect('/login')
                }
            })
            .catch(next)
    }
    register(req,res,next){
        User.findOne({
            username: req.body.username,
        })
        .then(user => {
            if(user)
            {

                console.log("Username has already existed" + user.username)
                res.redirect('/')
            }
            else
                { 
                    const user = new User({
                        username : req.body.username,
                        password : req.body.password,
                        diachi: req.body.diachi,
                        sdt: req.body.sdt,
                        fullname: req.body.fullname,
                        email: req.body.email,
                        isadmin: 0
                    })
                    
                    console.log(user);
                    //user.save()
                }
                res.render('HomeView')
            //res.redirect('/')
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


}

module.exports = new HomeController();
