const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Users = require('./models/Users');
const Recipe = require('./models/Recipe');
const Ingredient = require('./models/Ingredient');
const Nutrient = require('./models/Nutrient');
const Caution = require('./models/Caution');
const Digest = require('./models/Digest');
const CuisineType = require('./models/CuisineType');
const DishType = require('./models/DishType');
const MealType = require('./models/MealType');
const DietLabel = require('./models/DietLabel');
const RecipeIngredient = require('./models/RecipeIngredient');
const RecipeNutrient = require('./models/RecipeNutrient');
const RecipeCaution = require('./models/RecipeCaution');
const RecipeDietLabel= require('./models/RecipeDietLabel');
const RecipeDigest = require('./models/RecipeDigest');
const RecipeDishType = require('./models/RecipeDishType');
const RecipeHealthLabel = require('./models/RecipeHealthLabel');
const UserRecipe = require('./models/UserRecipe');
const UserDiets = require('./models/UserDiets');
const RecipeCuisioneType = require('./models/RecipeCuisineType');
const RecipeMealType = require('./models/RecipeMealType');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const secretKey = "H6nv=WN!?d85[/7;bCBr'`~{KL*9";

app.get('/users', async (req, res) => {
  const users = await Users.findAll();
  res.status(201).json(users);
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  res.status(200).json(user);
});

// Регистрация
app.post('/addUser', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const newUser = await Users.create({
      ...req.body,
      Password: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при добавлении пользователя' });
  }
});

// Логин
app.post('/login', async (req, res) => {
  const { Login, Password } = req.body;

  try {
    const user = await Users.findOne({ where: { Login } });

    if (!user) {
      console.log('Неверный логин');
      return res.status(400).json({ error: 'Неверный логин' });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      console.log('Неверный пароль');
      return res.status(400).json({ error: 'Неверный пароль' });
    }

    // Генерация JWT
    const token = jwt.sign({ userId: user.Id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.log('Ошибка сервера', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Пример защищенного маршрута
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Неверный токен' });
    }

    res.json({ message: 'Доступ разрешен', userId: decoded.userId });
  });
});

app.get('/cuisineTypes', async (req, res) => {
  const cuisineTypes = await CuisineType.findAll();
  res.status(201).json(cuisineTypes);
});

app.get('/dishTypes', async (req, res) => {
  const dishTypes = await DishType.findAll();
  res.status(201).json(dishTypes);
});

app.get('/mealTypes', async (req, res) => {
  const mealTypes = await MealType.findAll();
  res.status(201).json(mealTypes);
});

app.get('/dietLabels', async (req, res) => {
  const dietLabels = await DietLabel.findAll();
  res.status(201).json(dietLabels);
});

app.get('/getRecipes', async (req, res) => {
  const recipes = await Recipe.findAll();
  res.status(201).json(recipes);
});

app.get('/getRecipeDiets', async (req, res) => {
  const recipeDiets = await RecipeDietLabel.findAll();
  res.status(201).json(recipeDiets);
});

app.get('/getUserDiets', async (req, res) => {
  const userDiets = await UserDiets.findAll();
  res.status(201).json(userDiets);
});

app.post('/recipes', async (req, res) => {
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
});

app.post('/ingredients', async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    console.log('Ошибка при сохранении ингредиентов: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении ингредиента' });
  }
});

app.post('/nutrients', async (req, res) => {
  try {
    const nutrient = await Nutrient.create(req.body);
    res.status(201).json(nutrient);
  } catch (error) {
    console.log('Ошибка при сохранении питательных веществ: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении питательного вещества' });
  }
});

app.post('/cautions', async (req, res) => {
  try {
    const cautioneLabel = req.body.Label;
    const findCaution = await Caution.findAll({ where: { Label: cautioneLabel } });

    if (findCaution.length > 0) {
      console.log("Такой рецепт уже существует");
      return res.status(400).json({ error: 'Такой рецепт уже существует' });
    }

    const caution = await Caution.create(req.body);
    res.status(201).json(caution);
  } catch (error) {
    console.log('Ошибка при сохранении caution: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении caution' });
  }
});

app.post('/digests', async (req, res) => {
  try {
    const digest = await Digest.create(req.body);
    res.status(201).json(digest);
  } catch (error) {
    console.log('Ошибка при сохранении digest: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении digest' });
  }
});

app.post('/recipe-Ingredients', async (req, res) => {
  try {
    const recipeIngredient = await RecipeIngredient.create(req.body);
    res.status(201).json(recipeIngredient);
  } catch (error) {
    console.log('Ошибка при сохранении RecipeIngredient: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении ингредиента к рецепту' });
  }
});

app.post('/recipe-Nutrients', async (req, res) => {
  try {
    const recipeNutrient = await RecipeNutrient.create(req.body);
    res.status(201).json(recipeNutrient);
  } catch (error) {
    console.log('Ошибка при сохранении RecipeNutrient: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении нутриента к рецепту' });
  }
});

app.post('/recipe-Cautions', async (req, res) => {
  try {
    const recipeCaution = await RecipeCaution.create(req.body);
    res.status(201).json(recipeCaution);
  } catch (error) {
    console.log('Ошибка при сохранении RecipeCaution: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении Caution к рецепту' });
  }
});

app.post('/recipe-CuisineType', async (req, res) => {
  try {
    const RecipeCuisineType = await RecipeCuisioneType.create(req.body);
    res.status(201).json(RecipeCuisineType);
  } catch (error) {
    console.log('Ошибка при RecipeCuisineType: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении CuisineType к рецепту' });
  }
});

app.post('/recipe-DietLabel', async (req, res) => {
  try {
    const recipeDietLabel = await RecipeDietLabel.create(req.body);
    res.status(201).json(recipeDietLabel);
  } catch (error) {
    console.log('Ошибка при сохранении RecipeDietLabel: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении DietLabel к рецепту' });
  }
});

app.post('/recipe-Digest', async (req, res) => {
  try {
    const recipeDigest = await RecipeDigest.create(req.body);
    res.status(201).json(recipeDigest);
  } catch (error) {
    console.log('Ошибка при сохранении RecipeDigest: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении Digest к рецепту' });
  }
});

app.post('/recipe-DishType', async (req, res) => {
  try {
    const recipeDishType = await RecipeDishType.create(req.body);
    res.status(201).json(recipeDishType);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении DishType к рецепту' });
  }
});

app.post('/recipe-HealthLabel', async (req, res) => {
  try {
    const recipeHealthLabel = await RecipeHealthLabel.create(req.body);
    res.status(201).json(recipeHealthLabel);
  } catch (error) {
    console.log('Ошибка при сохранении RecipeHealthLabel: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении Healthlabel к рецепту' });
  }
});

app.post('/recipe-MealType', async (req, res) => {
  try {
    const recipeMealType = await RecipeMealType.create(req.body);
    res.status(201).json(recipeMealType);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении MealType к рецепту' });
  }
});

app.post('/user-Recipe', async (req, res) => {
  try {
    const userRecipe = await UserRecipe.create(req.body);
    res.status(201).json(userRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении рецепта пользователя' });
  }
});

app.post('/user-Diets', async (req, res) => {
  try {
    const userDiets = await UserDiets.create(req.body);
    res.status(201).json(userDiets);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при добавлении диеты пользователя' });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
console.log(`Сервер успешно работает на порту: ${PORT}`);
});