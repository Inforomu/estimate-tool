const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const clientCtrl = require('../controllers/client');

router.get('/', auth, clientCtrl.getAllClient);
router.post('/', auth, clientCtrl.createClient);


module.exports = router;