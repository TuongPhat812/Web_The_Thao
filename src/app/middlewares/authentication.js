module.exports = function(req, res, next) {
    res.locals.user = {
        _id: req.session._id,
        userName: req.session.userName,
        password: req.session.password,
        email: req.session.email,
        fullname: req.session.fullname,
        diaChi: req.session.diaChi,
        sdt: req.session.sdt,
        role: req.session.role
    }

    next()


}