const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/', apiController.getUsersInLondon);

module.exports = router;
