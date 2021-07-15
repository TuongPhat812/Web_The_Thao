const express = require('express');
const router = express.Router();

const dataController = require('../app/controllers/DataController');






// [GET] /


router.get('/users', dataController.renderUsers);
router.get('/products', dataController.renderProducts);

module.exports = router;


