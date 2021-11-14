const express = require('express');
const router = express.Router();
const controller = require('../controllers/Users')();
//const middleware = require('../middlewares/auth');

router.post('/',
    controller.CreateUser
);

router.get('/UserList',
    //middleware.checkToken,
    controller.GetAllUsers
);

router.get('/User/:id',
    //middleware.checkToken,
    controller.GetSingleUser
);
router.delete('/User/:_id',
    //middleware.checkToken,
    controller.deleteUser
);
router.put('/Users/:id',
    //  middleware.checkToken,
    controller.updateUser
);
// Login route
router.post('/login',
    controller.login
);


module.exports = router;