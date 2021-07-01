const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');






// [GET] /
router.get('/change-pass', userController.changePass)
router.get('/purchase-history', userController.getPurchaseHistory)
router.get('/editUser', userController.editUser)
router.get('/info', userController.getInfo);


module.exports = router;