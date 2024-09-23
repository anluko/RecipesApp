const express = require('express');
const router = express.Router();
const { getIngredients, getIngredientById, addIngredient } = require('../controllers/ingredientsController');

router.get('/', getIngredients);

router.get('/:id', getIngredientById);

router.post('/add', addIngredient);

module.exports = router;
