const Recipe = require('../models/Recipe');

const getRecipes = async (req, res) => {
  const recipes = await Recipe.findAll();
  res.status(201).json(recipes);
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'ID должен быть числом' });

  const recipe = await Recipe.findByPk(id);
  if (!recipe) return res.status(404).json({ error: 'Рецепт не найден' });

  res.status(200).json(recipe);
};

const addRecipe = async (req, res) => {
  try {
    const recipeLabel = req.body.Label;
    const findRecipe = await Recipe.findAll({ where: { Label: recipeLabel } });

    if (findRecipe.length > 0) {
        console.log("Такой рецепт уже существует");
        return res.status(400).json({ error: 'Такой рецепт уже существует' });
    }

    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
    } catch (error) {
    console.log("Ошибка при сохранении рецепта", error);
    res.status(500).json({ error: 'Ошибка при добавлении рецепта' });
  }
};

module.exports = { getRecipes, getRecipesById, addRecipe };