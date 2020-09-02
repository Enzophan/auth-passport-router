const express = require('express');
const router = express.Router();

const userCtrl = require('../Controllers/User');
const AuthCtrl = require('../Controllers/Auth');

router.get('/', AuthCtrl.checkAuthenticated, (req, res) => {
    res.send('<h1>Home</h1>')
});


router.get('/get', AuthCtrl.checkAuthenticated, (req, res) => {
    res.send('<h1>Get Users</h1>')
});

router.post('/register', userCtrl.createUser);


module.exports = router;