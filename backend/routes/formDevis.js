const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const formDevisController = require('../controllers/formDevisController');

router.get('/', auth, formDevisController.getAllFormData);
router.post('/', auth, formDevisController.submitForm);

module.exports = router;