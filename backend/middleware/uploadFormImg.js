const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/jfif': 'jfif'
};

const storage = multer.memoryStorage();

module.exports = multer({ storage: storage }).array('image');