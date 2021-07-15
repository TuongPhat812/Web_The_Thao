const express = require('express');
const router = express.Router();
const conController = require('../app/controllers/ContactController');
router.post('/sendContact', conController.sendContact)
router.get('/', conController.index)
module.exports = router;