const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/linkedsController");

router.get("/cuisineTypes", getCuisineTypes);
router.get("/dietLabels", getDietLabels);
router.get("/dishTypes", getDishTypes);
router.get("/mealTypes", getMealTypes);
router.get("/newsTabs", getNewsTabs);
router.get("/recipeDiets", getRecipeDiets);
router.get("/recipeIngredients", getRecipeIngredients);
router.get("/userDiets", getUserDiets);

router.post("/recipeCaution/add", addRecipeCautions);
router.post("/recipeCuisineTypes/add", addRecipeCuisineTypes);
router.post("/recipeDietLabels/add", addRecipeDietLabels);
router.post("/recipeDigests/add", addRecipeDigests);
router.post("/recipeDishTypes/add", addRecipeDishTypes);
router.post("/recipeHealthLabel/add", addRecipeHealthLabels);
router.post("/recipeIngredients/add", addRecipeIngredients);
router.post("/recipeMealTypes/add", addRecipeMealTypes);
router.post("/recipeNutrients/add", addRecipeNutrients);
router.post("/userDiets/add", addUserDiets);
router.post("/userRecipes/add", addUserRecipes);

module.exports = router;
