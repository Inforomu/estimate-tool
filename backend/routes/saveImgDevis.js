const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/uploadFormImg');
const saveImg = require('../controllers/saveImgDevis');

router.post('/uploadimg', fileUpload, saveImg.uploadImg);
// router.get('/getImagesForDevis/:id', saveImg.getImagesForDevis);


module.exports = router;
