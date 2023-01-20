const Recipe = require('../models/recipe');

/** Admin       **/
//const recipeList = [];

exports.getAddRecipe = (req, res, next) => {
    res.render('add-recipe');
};

exports.postAddRecipe = (req, res, nex) => {
    /**recipeList.push({
        name: req.body.name,
        description: req.body.description
    });**/
    const recipe = new Recipe(req.body.name, req.body.description);
    recipe.save();
    res.redirect('/');
};

/** User       **/
exports.getHome = (req, res, next) => {
    Recipe.fetchAll((recipeList) => {
        res.render('recipes', {
            dishes: recipeList
        });
    });
};

exports.getRecipeDetail = (req, res, next) => {
    const requestedDish = req.query.dish;
    Recipe.fetchNames((recipeList) => {
        if(recipeList.includes(requestedDish)) {
            res.render('recipe-detail', {
                dish: requestedDish
            });
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};