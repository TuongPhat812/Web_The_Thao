const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');






// [GET] /


router.get('/users', adminController.getUsers);
router.get('/edit-user', adminController.getEditUser);
router.post('/edit-user', adminController.postEditUser);
router.post('/delete-user', adminController.postDeleteUser);

router.get('/products', adminController.getProducts)

router.get('/', adminController.index);


module.exports = router;


