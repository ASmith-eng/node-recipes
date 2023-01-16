const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'recipes.html'));
    const recipeList = adminData.recipes;
    res.render('recipes', {dishes: recipeList});
});

module.exports = router;