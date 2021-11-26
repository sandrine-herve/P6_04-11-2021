const express = require('express');
const router = express.Router();

const password = require('../middleware/password');
const rateLimit = require('../middleware/express-rate-limit');

const userCtrl = require('../controllers/user');

router.post('/signup',password,rateLimit ,userCtrl.signup);
router.post('/login',rateLimit ,userCtrl.login);

module.exports = router;