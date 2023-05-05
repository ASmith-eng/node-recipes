const Recipe = require('../models/recipe');

/** Admin **/
exports.getAddRecipe = (req, res, next) => {
    res.render('./admin/add-recipe');
};

exports.postAddRecipe = (req, res, nex) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const recipe = new Recipe(name, description, imageUrl);
    recipe.save();
    res.redirect('/');
};

exports.getEditRecipe = (req, res, next) => {
    const requestedID = parseInt(req.params.recipeID);
    Recipe.queryRecipeById(requestedID, (result) => {
        if(result.recipeID==requestedID) {
            res.render('./admin/edit-recipe', {
                dish: result
            });
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};

exports.postEditRecipe = (req, res, next) => {
    const editedID = parseInt(req.params.recipeID);
    Recipe.queryRecipeById(editedID, (result) => {
        if(result.recipeID==editedID) {
            const editedDish = new Recipe(editedID, req.body.name, req.body.description, req.body.imageUrl);
            editedDish.updateMongo(editedID);
            res.redirect('/');
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};

/** User       **/
exports.getHome = (req, res, next) => {
    Recipe.fetchAllMongo((featuredRecipes) => {
        res.render('recipes', {
            dishes: featuredRecipes
        });
    }, 4);
};

exports.getRecipeDetail = (req, res, next) => {
    const requestedID = parseInt(req.params.recipeID);
    Recipe.queryRecipeById(requestedID, (result) => {
        if(result.recipeID==requestedID) {
            res.render('recipe-detail', {
                dish: result
            });
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};

exports.getRecipeList = (req, res, next) => {
    Recipe.fetchAllMongo((allRecipes) => {
        res.render('./recipe-list', {
            dishes: allRecipes
        });
    });
};