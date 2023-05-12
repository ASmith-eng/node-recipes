const path = require('path');

const express = require('express');

const recipesController = require('../controllers/recipe-contr');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/add-recipe', isAuth, recipesController.getAddRecipe);
router.get('/edit-recipe/:recipeId', isAuth, recipesController.getEditRecipe);

router.post('/add-recipe', isAuth, recipesController.postAddRecipe);
router.post('/edit-recipe/:recipeId', isAuth, recipesController.postEditRecipe);

module.exports = router;