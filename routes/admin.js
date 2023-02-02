const path = require('path');

const express = require('express');

const recipesController = require('../controllers/recipe-contr');

const router = express.Router();

router.get('/add-recipe', recipesController.getAddRecipe);
router.get('/edit-recipe', recipesController.getEditRecipe);

router.post('/add-recipe', recipesController.postAddRecipe);
router.post('/edit-recipe', recipesController.postEditRecipe);

module.exports = router;