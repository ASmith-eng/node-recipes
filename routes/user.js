const path = require('path');

const express = require('express');

const recipesController = require('../controllers/recipe-contr');

const router = express.Router();

router.get('/', recipesController.getHome);
router.get('/recipes', recipesController.getRecipeDetail);
router.get('/recipe-list', recipesController.getRecipeList);

module.exports = router;