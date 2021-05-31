const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');






// [GET] /

router.get('/users', adminController.getUsers);
//router.get('/users/:username', adminController.getUser);
//router.delete('/users/:username', adminController.delUser);
//router.patch('/users/:username', adminController.updateUser);

//router.get('/users/:idUser', adminController.showUser);
//router.get('/products', adminController.showProducts);
//router.get('/carts', adminController.showUsers);
router.get('/', adminController.index);


module.exports = router;


