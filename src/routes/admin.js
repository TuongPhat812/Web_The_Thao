const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');






// [GET] /
router.get('/', adminController.index);


module.exports = router;


