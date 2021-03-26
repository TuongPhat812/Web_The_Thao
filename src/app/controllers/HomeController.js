re
class HomeController {
    // GET /home
    index(req, res, next) {
        res.render("HomeView")
        .then(XoaSP)
        .then(XoaUser);
        redirect
    }

    
}

module.exports = new HomeController();