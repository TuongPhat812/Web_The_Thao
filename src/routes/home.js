const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');


//router.get('/:slug', homeController.show);
router.get('/', homeController.index);
router.get('/hello', homeController.index);
router.post(/)
router.delete('/')
//router.use('/', homeController.index);

module.exports = router;
