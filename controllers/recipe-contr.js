const Recipe = require('../models/recipe');

/** Admin **/
exports.getAddRecipe = (req, res, next) => {
    res.render('./admin/add-recipe');
};

exports.postAddRecipe = (req, res, nex) => {
    const recipe = new Recipe(req.body.name, req.body.description);
    recipe.save();
    res.redirect('/');
};

exports.getEditRecipe = (req, res, next) => {
    const requestedDish = req.query.dish;
    Recipe.fetchNames((recipeNames) => {
        if(recipeNames.includes(requestedDish)) {
            res.render('./admin/edit-recipe', {
                dish: requestedDish
            });
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};

/** User       **/
exports.getHome = (req, res, next) => {
    Recipe.fetchAll((allRecipes) => {
        res.render('recipes', {
            dishes: allRecipes
        });
    });
};

exports.getRecipeDetail = (req, res, next) => {
    const requestedDish = req.query.dish;
    Recipe.fetchNames((recipeNames) => {
        if(recipeNames.includes(requestedDish)) {
            res.render('recipe-detail', {
                dish: requestedDish
            });
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};

exports.getRecipeList = (req, res, next) => {
    Recipe.fetchAll((allRecipes) => {
        res.render('./recipe-list', {
            dishes: allRecipes
        });
    });
};