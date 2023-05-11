const express = require('express');

const authController = require('../controllers/auth-contr');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;