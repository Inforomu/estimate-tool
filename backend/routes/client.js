const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const clientCtrl = require('../controllers/client');

router.get('/', auth, clientCtrl.getAllClient);
router.get('/:id', auth, clientCtrl.getOneClient);
router.get('/:id/devis', auth, clientCtrl.getDevis);
router.post('/', auth, clientCtrl.createClient);
router.put('/:id', auth, clientCtrl.modifyClient);


module.exports = router;