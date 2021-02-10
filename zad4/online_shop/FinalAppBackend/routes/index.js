const express = require('express');
const router = express.Router();
const cors = require('cors');

const indexController = require('../controllers/indexController')
const ProductsController = require('../controllers/ProductsController');
const StatusController = require('../controllers/StatusController');
const CategoriesController = require('../controllers/CategoriesController');
const OrdersController = require('../controllers/OrdersController');

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
};

// zdefiniowanie odpowiedzi dla "strony głównej"
router.get('/', indexController.home);
router.get('/greet/:greeting/:name', indexController.customgreeting);

router.get('/products', cors(corsOptions), ProductsController.getAll);
router.get('/products/:id', ProductsController.getById);
router.post('/products',  ProductsController.store);
router.put('/products', ProductsController.updateById);

router.get('/orders', cors(corsOptions), OrdersController.getAll)
router.post('/orders', OrdersController.store)
router.get('/orders/status/:id', OrdersController.getByStatus)
router.put('/orders/:id/status', OrdersController.updateStatus)
// router.get('/orders', OrdersController.getAll)

router.get('/categories', cors(corsOptions), CategoriesController.getAll)
router.get('/status', cors(corsOptions), StatusController.getAll);

module.exports = router;