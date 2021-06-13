const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');






// [GET] /


router.get('/info', userController.getInfo);


module.exports = router;


