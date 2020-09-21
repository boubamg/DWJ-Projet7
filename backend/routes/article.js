const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config')

const articleController = require('../controllers/article');

router.get('/', articleController.getAllArticles);
router.post('/', auth, multer, articleController.createArticle);
router.get('/:id', auth, articleController.getOneArticle);
router.put('/:id', auth, multer, articleController.updateArticle);
router.delete('/:id', auth, articleController.deleteArticle);

module.exports = router;