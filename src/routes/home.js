const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

//router.get('/:slug', homeController.show);
//router.get('/hello', homeController.index);

router.get('/register', homeController.dangky)
router.post('/register', homeController.register)
router.get('/login', homeController.dangnhap)
router.post('/login', homeController.login)
router.get('/logout', homeController.logout)

///router.delete('/')

//router.get('/test', homeController.test);
// [GET] Home 
router.get('/', homeController.index);


module.exports = router;


// Đầu tiên là set up URL trong router -> Bắt url tương ứng với mấy cái hàm ở Controller -> sẽ thực hiện hành vi của hàm 
// Phương thức là get post
//get là lấy dữ liệu từ server trả về cho client 
// post là lấy dữ liệu từ client ném lên server