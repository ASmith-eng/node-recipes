const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/add-recipe', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-recipe.html'));
});

router.post('/add-recipe', (req, res, nex) => {
    console.log(req.body);
    res.redirect('/admin/add-recipe');
});

module.exports = router;