const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const storage = multer.diskStorage({

    // init file destination
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },

    // filename
    filename: (req, file, cb) => {
        let name = file.originalname.split(' ').join('_');
        let extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage : storage}).single('attachment');