const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const formDevisController = require('../controllers/formDevisController');

router.get('/', auth, formDevisController.getAllFormData);
router.get('/:id', auth, formDevisController.getOneDevis);
router.post('/', auth, formDevisController.submitForm);

module.exports = router;