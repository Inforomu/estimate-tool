const express = require('express');
const router = express.Router();
const formDevisController = require('../controllers/formDevisController');

router.post('/uploadformdevis', formDevisController.submitForm);

module.exports = router;