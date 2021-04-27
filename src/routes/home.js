const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

//router.get('/:slug', homeController.show);
//router.get('/hello', homeController.index);
router.post('/register',homeController.register)
router.post('/login',homeController.login)
///router.delete('/')

//router.get('/test', homeController.test);
// [GET] Home 
router.get('/', homeController.index);


module.exports = router;