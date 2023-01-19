const path = require('path');

const express = require('express');

const recipesController = require('../controllers/recipe-contr');

const router = express.Router();

router.get('/', recipesController.getHome);

module.exports = router;