const express = require('express');
const router = express.Router();

const dataController = require('../app/controllers/DataController');






// [GET] /


router.get('/users', dataController.renderUsers);


module.exports = router;


