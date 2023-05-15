const express = require('express');

const authController = require('../controllers/auth-contr');
const noAuthOnly = require('../middleware/noAuthOnly');

const router = express.Router();

router.get('/login', noAuthOnly, authController.getLogin);
router.get('/signup', authController.getSignup);

router.post('/login', noAuthOnly, authController.postLogin);
router.post('/logout', authController.postLogout);
router.post('/signup', noAuthOnly, authController.postSignup);

module.exports = router;