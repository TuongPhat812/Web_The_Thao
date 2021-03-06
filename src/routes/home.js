const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.get('/contact', (req, res, next) => {
    const authUser = res.locals.user;
    res.render('Contact', { authUser })
})
router.get('/register', homeController.getRegister)
router.post('/register', homeController.postRegister)
router.get('/login', homeController.getLogin)
router.post('/login', homeController.postLogin)
router.get('/logout', homeController.getLogout)
router.get('/forgot-password', homeController.getForgotPassword)
router.post('/forgot-password', homeController.postForgotPassword)
router.get('/', homeController.index)


module.exports = router;