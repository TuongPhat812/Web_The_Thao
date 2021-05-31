const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
router.get('/:id', productController.index);
router.get('/', productController.getAllProducts)

module.exports = router;