const Product = require('../models/Product')
const User = require('../models/User')
class HomeController {
    //[GET]: /admin - Hiển thị giao diện trang admin
    index(req, res, next) {
        //Lấy ra user nếu đã đăng nhập thành công
        const authUser = res.locals.user;
        console.log(authUser)
        if(authUser.role)
        { 
            res.render('admins/admin_product', {authUser})
        }
        else
            res.redirect('/')
    }

    //[GET]: /admin/users - Hiển thị toàn bộ user
    getUsers(req,res,next){
        // const authUser = res.locals.user;
        // if(authUser.role){
        //     User.find({})
        //     .then(users => {
        //         users = users.map(user => user.toObject())
                
        //         res.render("admins/Admin_UserView", { authUser, users})
        //     })
        //     .catch(next)
        // }
        // else
        //     res.redirect('/')
        res.render('admins/Admin_UserView')

    }
}

module.exports = new HomeController();