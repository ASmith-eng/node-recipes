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

exports.postEditRecipe = (req, res, next) => {
    const oldName = req.query.dish;
    Recipe.fetchNames((recipeNames) => {
        if(recipeNames.includes(oldName)) {
            const editedDish = new Recipe(req.body.name, req.body.description);
            editedDish.update(oldName);
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
                dish: result.name
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