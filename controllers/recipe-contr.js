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
    const requestedId = req.params.recipeId;
    Recipe.queryRecipeById((requestedId), (result) => {
        if(result!=null && result._id==requestedId) {
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
    const editedId = req.params.recipeId;
    Recipe.queryRecipeById(editedId, (result) => {
        if(result._id==editedId) {
            const editedDish = new Recipe(req.body.name, req.body.description, req.body.imageUrl);
            editedDish.update(editedId);
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
    const requestedId = req.params.recipeId;
    Recipe.queryRecipeById(requestedId, (result) => {
        if(result._id==requestedId) {
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