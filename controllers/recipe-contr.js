/** Admin       **/
const recipeList = [];

exports.getAddRecipe = (req, res, next) => {
    res.render('add-recipe');
};

exports.postAddRecipe = (req, res, nex) => {
    recipeList.push({
        name: req.body.name,
        description: req.body.description
    });
    res.redirect('/');
};

/** Home        **/
exports.getHome = (req, res, next) => {
    res.render('recipes', {
        dishes: recipeList
    });
};