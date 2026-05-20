const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/create', productsController.create);
router.get('/', productsController.list);
router.post('/', productsController.store);
router.get('/cart', productsController.cart);
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.destroy);
router.get('/:id', productsController.detail);


module.exports = router;