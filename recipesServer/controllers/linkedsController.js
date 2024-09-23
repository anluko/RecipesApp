const CuisineType = require("../models/CuisineType");
const DishType = require("../models/DishType");
const MealType = require("../models/MealType");
const DietLabel = require("../models/DietLabel");
const NewsTab = require("../models/NewsTab");
const RecipeIngredient = require("../models/RecipeIngredient");
const RecipeNutrient = require("../models/RecipeNutrient");
const RecipeCaution = require("../models/RecipeCaution");
const RecipeDietLabel = require("../models/RecipeDietLabel");
const RecipeDigest = require("../models/RecipeDigest");
const RecipeDishType = require("../models/RecipeDishType");
const RecipeHealthLabel = require("../models/RecipeHealthLabel");
const UserRecipe = require("../models/UserRecipe");
const UserDiets = require("../models/UserDiets");
const RecipeCuisioneType = require("../models/RecipeCuisineType");
const RecipeMealType = require("../models/RecipeMealType");

const getCuisineTypes = async (req, res) => {
  const cuisineTypes = await CuisineType.findAll();
  res.status(201).json(cuisineTypes);
};

const getDishTypes = async (req, res) => {
  const dishTypes = await DishType.findAll();
  res.status(201).json(dishTypes);
};

const getMealTypes = async (req, res) => {
  const mealTypes = await MealType.findAll();
  res.status(201).json(mealTypes);
};

const getDietLabels = async (req, res) => {
  const dietLabels = await DietLabel.findAll();
  res.status(201).json(dietLabels);
};

const getRecipeIngredients = async (req, res) => {
  const recipeIngredients = await RecipeIngredient.findAll();
  res.status(201).json(recipeIngredients);
};

const getRecipeDiets = async (req, res) => {
  const recipeDiets = await RecipeDietLabel.findAll();
  res.status(201).json(recipeDiets);
};

const getUserDiets = async (req, res) => {
  const userDiets = await UserDiets.findAll();
  res.status(201).json(userDiets);
};

const getNewsTabs = async (req, res) => {
  const newsTabs = await NewsTab.findAll();
  res.status(201).json(newsTabs);
};

const addRecipeIngredients = async (req, res) => {
  try {
    const recipeIngredient = await RecipeIngredient.create(req.body);
    res.status(201).json(recipeIngredient);
  } catch (error) {
    console.log("Ошибка при сохранении RecipeIngredient: ", error);
    res
      .status(500)
      .json({ error: "Ошибка при добавлении ингредиента к рецепту" });
  }
};

const addRecipeNutrients = async (req, res) => {
  try {
    const recipeNutrient = await RecipeNutrient.create(req.body);
    res.status(201).json(recipeNutrient);
  } catch (error) {
    console.log("Ошибка при сохранении RecipeNutrient: ", error);
    res
      .status(500)
      .json({ error: "Ошибка при добавлении нутриента к рецепту" });
  }
};

const addRecipeCautions = async (req, res) => {
  try {
    const recipeCaution = await RecipeCaution.create(req.body);
    res.status(201).json(recipeCaution);
  } catch (error) {
    console.log("Ошибка при сохранении RecipeCaution: ", error);
    res.status(500).json({ error: "Ошибка при добавлении Caution к рецепту" });
  }
};

const addRecipeCuisineTypes = async (req, res) => {
  try {
    const RecipeCuisineType = await RecipeCuisioneType.create(req.body);
    res.status(201).json(RecipeCuisineType);
  } catch (error) {
    console.log("Ошибка при RecipeCuisineType: ", error);
    res
      .status(500)
      .json({ error: "Ошибка при добавлении CuisineType к рецепту" });
  }
};

const addRecipeDietLabels = async (req, res) => {
  try {
    const recipeDietLabel = await RecipeDietLabel.create(req.body);
    res.status(201).json(recipeDietLabel);
  } catch (error) {
    console.log("Ошибка при сохранении RecipeDietLabel: ", error);
    res
      .status(500)
      .json({ error: "Ошибка при добавлении DietLabel к рецепту" });
  }
};

const addRecipeDigests = async (req, res) => {
  try {
    const recipeDigest = await RecipeDigest.create(req.body);
    res.status(201).json(recipeDigest);
  } catch (error) {
    console.log("Ошибка при сохранении RecipeDigest: ", error);
    res.status(500).json({ error: "Ошибка при добавлении Digest к рецепту" });
  }
};

const addRecipeDishTypes = async (req, res) => {
  try {
    const recipeDishType = await RecipeDishType.create(req.body);
    res.status(201).json(recipeDishType);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении DishType к рецепту" });
  }
};

const addRecipeHealthLabels = async (req, res) => {
  try {
    const recipeHealthLabel = await RecipeHealthLabel.create(req.body);
    res.status(201).json(recipeHealthLabel);
  } catch (error) {
    console.log("Ошибка при сохранении RecipeHealthLabel: ", error);
    res
      .status(500)
      .json({ error: "Ошибка при добавлении Healthlabel к рецепту" });
  }
};

const addRecipeMealTypes = async (req, res) => {
  try {
    const recipeMealType = await RecipeMealType.create(req.body);
    res.status(201).json(recipeMealType);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении MealType к рецепту" });
  }
};

const addUserRecipes = async (req, res) => {
  try {
    const userRecipe = await UserRecipe.create(req.body);
    res.status(201).json(userRecipe);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при добавлении рецепта пользователя" });
  }
};

const addUserDiets = async (req, res) => {
  try {
    const userDiets = await UserDiets.create(req.body);
    res.status(201).json(userDiets);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при добавлении диеты пользователя" });
  }
};

module.exports = {
  getCuisineTypes,
  getDietLabels,
  getDishTypes,
  getMealTypes,
  getNewsTabs,
  getRecipeDiets,
  getRecipeIngredients,
  getUserDiets,
  addRecipeCautions,
  addRecipeCuisineTypes,
  addRecipeDietLabels,
  addRecipeDigests,
  addRecipeDishTypes,
  addRecipeHealthLabels,
  addRecipeIngredients,
  addRecipeMealTypes,
  addRecipeNutrients,
  addUserDiets,
  addUserRecipes,
};
