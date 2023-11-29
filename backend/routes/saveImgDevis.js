const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/uploadFormImg');
const saveImg = require('../controllers/saveImgDevis');

router.post('/', fileUpload, saveImg.uploadImg);
router.get('/getImagesForDevis/:devisId', saveImg.getImagesForDevis);


module.exports = router;
