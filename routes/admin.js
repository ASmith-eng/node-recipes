const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

const recipes = [];

router.get('/add-recipe', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-recipe.html'));
    res.render('add-product');
});

router.post('/add-recipe', (req, res, nex) => {
    recipes.push({name: req.body.name, description: req.body.description})
    res.redirect('/');
});

exports.routes = router;
exports.recipes = recipes;