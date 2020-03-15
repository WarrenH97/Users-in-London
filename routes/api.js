const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/', apiController.index);
router.get('/users', apiController.getUsersInLondon);

module.exports = router;
