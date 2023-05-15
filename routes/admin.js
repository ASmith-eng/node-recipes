const express = require('express');

const recipesController = require('../controllers/recipe-contr');
const requiresAuth = require('../middleware/requiresAuth');

const router = express.Router();

router.get('/add-recipe', requiresAuth, recipesController.getAddRecipe);
router.get('/edit-recipe/:recipeId', requiresAuth, recipesController.getEditRecipe);

router.post('/add-recipe', requiresAuth, recipesController.postAddRecipe);
router.post('/edit-recipe/:recipeId', requiresAuth, recipesController.postEditRecipe);

module.exports = router;