const express = require('express');
const router = express.Router();
const { getRecipes, getRecipesById, addRecipe } = require('../controllers/recipesController');

router.get('/', getRecipes);

router.get('/:id', getRecipesById);

router.post('/add', addRecipe);

module.exports = router;
