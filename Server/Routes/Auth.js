const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthCtrl = require('../Controllers/Auth');

router.get('/logout', AuthCtrl.logout);
router.post('/login', passport.authenticate('local'), AuthCtrl.login);

module.exports = router;