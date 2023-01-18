const path = require('path');

const express = require('express');

const recipesController = require('../controllers/recipe-contr');

const router = express.Router();

router.get('/add-recipe', recipesController.getAddRecipe);

router.post('/add-recipe', recipesController.postAddRecipe);

module.exports = router;