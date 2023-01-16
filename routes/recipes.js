const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'recipes.html'));
    res.render('recipes', {dishes: 'recipes'});
});

module.exports = router;