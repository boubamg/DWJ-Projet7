const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
}

const storage = multer.diskStorage({

    // init file destination
    destination: (req, res, cb) => {
        cb(null, 'images');
    },

    // filename
    filename: (req, res, cb) => {
        let name = req.file.originalname.split(' ').join('_');
        let extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage : storage}).single('image');