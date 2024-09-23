const Nutrient = require('../models/Nutrient');

const getNutrients = async (req, res) => {
  const nutrient = await Nutrient.findAll();
  res.status(201).json(nutrient);
};

const getNutrientById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'ID должен быть числом' });

  const nutrient = await Nutrient.findByPk(id);
  if (!nutrient) return res.status(404).json({ error: 'Питательное вещество не найдено' });

  res.status(200).json(nutrient);
};

const addNutrient = async (req, res) => {
  try {
    const nutrient = await Nutrient.create(req.body);
    res.status(201).json(nutrient);
    } catch (error) {
    console.log('Ошибка при сохранении питательных веществ: ', error);
    res.status(500).json({ error: 'Ошибка при добавлении питательного вещества' });
  }
};

module.exports = { getNutrients, getNutrientById, addNutrient };