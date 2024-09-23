const Ingredient = require('../models/Ingredient');

const getIngredients = async (req, res) => {
  const ingredients = await Ingredient.findAll();
  res.status(200).json(ingredients);
};

const getIngredientById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'ID должен быть числом' });

  const ingredients = await Ingredient.findByPk(id);
  if (!ingredients) return res.status(404).json({ error: 'Ингредиент не найден' });

  res.status(200).json(ingredients);
};

const addIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(200).json(ingredient);
    } catch (error) {
    console.log('Ошибка при сохранении ингредиентов: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении ингредиента' });
  }
};

module.exports = { getIngredients, getIngredientById, addIngredient };