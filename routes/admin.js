const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/add-recipe', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-recipe.html'));
});

module.exports = router;