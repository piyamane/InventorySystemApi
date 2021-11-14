const express = require('express');
const router = express.Router();
const controller = require('../controllers/Product')();
//const middleware = require('../middlewares/auth');

router.post('/',
    controller.CreateProduct
);

router.get('/ProductList',
    controller.GetAllProducts
);

router.get('/Products/:id',
    controller.GetSingleProduct
);
router.delete('/Product/:_id',
    controller.deleteProduct
);
router.put('/Product/:id',
    //  middleware.checkToken,
    controller.updateProduct
);


module.exports = router;