const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');






// [GET] /


router.get('/users', adminController.getUsers);
router.get('/edit-user', adminController.getEditUser);
router.post('/edit-user', adminController.postEditUser);
router.post('/delete-user', adminController.postDeleteUser);

router.get('/products', adminController.getProducts)
router.get('/create-product', adminController.getCreateProduct)
router.post('/create-product', adminController.postCreateProduct)
router.post('/edit-img-product/:id', adminController.postEditImgProduct)
router.get('/edit-product', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.post('/delete-product', adminController.postDeleteProduct)


router.get('/', adminController.index);


module.exports = router;


