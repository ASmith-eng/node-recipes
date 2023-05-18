const RecipeName = require('../models/recipe').RecipeName;
const Ingredients = require('../models/recipe').RecipeIngredients;
const isRecipeOwner = require('../utils/isRecipeOwner');

/** Admin **/
exports.getAddRecipe = (req, res, next) => {
    res.render('./admin/add-recipe');
};

exports.postAddRecipe = (req, res, nex) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const recipe = new RecipeName(name, description, imageUrl, req.user._id);
    recipe.save();
    res.redirect('/');
};

exports.getEditRecipe = (req, res, next) => {
    const requestedId = req.params.recipeId;
    RecipeName.queryRecipeById((requestedId), (recipe) => {
        const isOwner = isRecipeOwner(req, recipe.userId);
        if(recipe!=null && recipe._id==requestedId) {
            if(!isOwner) {
                return res.redirect('/');
            }
            res.render('./admin/edit-recipe', {
                dish: recipe,
            });
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};

exports.postEditRecipe = (req, res, next) => {
    const editedId = req.params.recipeId;
    RecipeName.queryRecipeById(editedId, (recipe) => {
        const isOwner = isRecipeOwner(req, recipe.userId);
        if(recipe._id==editedId) {
            if(!isOwner) {
                return res.redirect('/');
            }
            const editedDish = new RecipeName(req.body.name, req.body.description, req.body.imageUrl);
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
    RecipeName.fetchAllMongo((featuredRecipes) => {
        res.render('recipes', {
            dishes: featuredRecipes,
        });
    }, 4);
};

exports.getRecipeDetail = (req, res, next) => {
    const requestedId = req.params.recipeId;
    RecipeName.queryRecipeById(requestedId, (recipe) => {
        if(recipe._id==requestedId) {
            Ingredients.queryIngredientsById(requestedId, (ingredients) => {
                const isOwner = isRecipeOwner(req, recipe.userId);
                res.render('recipe-detail', {
                    dish: recipe,
                    ingredients: ingredients,
                    isOwner: isOwner
                });
            });
        }
        else {
            res.status(404).render('page-not-found');
        }
    });
};

exports.getRecipeList = (req, res, next) => {
    RecipeName.fetchAllMongo((allRecipes) => {
        res.render('./recipe-list', {
            dishes: allRecipes
        });
    });
};