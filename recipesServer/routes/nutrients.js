const express = require('express');
const router = express.Router();
const { getNutrients, getNutrientById, addNutrient } = require('../controllers/nutrientsController');

router.get('/', getNutrients);

router.get('/:id', getNutrientById);

router.post('/add', addNutrient);

module.exports = router;
