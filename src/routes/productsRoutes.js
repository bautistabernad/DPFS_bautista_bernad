const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const productValidations = require('../middlewares/productValidations');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const teacherMiddleware = require('../middlewares/teacherMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products');
    },

    filename: (req, file, cb) => {
        const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

router.get('/create', authMiddleware, teacherMiddleware, productsController.create);
router.get('/', productsController.list);
router.post('/', authMiddleware, teacherMiddleware, upload.single('image'), productValidations, productsController.store);

router.get('/cart', productsController.cart);
router.get('/search/results', productsController.search);

router.get('/:id/edit', authMiddleware, productsController.edit);
router.put('/:id', authMiddleware, upload.single('image'), productValidations, productsController.update);
router.delete('/:id', authMiddleware, productsController.destroy);

router.get('/:id', productsController.detail);

module.exports = router;