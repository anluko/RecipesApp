const Caution = require("../models/Caution");

const getCautions = async (req, res) => {
  const cautions = await Caution.findAll();
  res.status(200).json(cautions);
};

const getCautionById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id))
    return res.status(400).json({ error: "ID должен быть числом" });

  const cautions = await Caution.findByPk(id);
  if (!cautions) return res.status(404).json({ error: "Caution не найден" });

  res.status(200).json(cautions);
};

const addCaution = async (req, res) => {
  try {
    const cautioneLabel = req.body.Label;
    const findCaution = await Caution.findAll({
      where: { Label: cautioneLabel },
    });

    if (findCaution.length > 0) {
      console.log("Такой caution уже существует");
      return res.status(400).json({ error: "Такой Caution уже существует" });
    }

    const caution = await Caution.create(req.body);
    res.status(201).json(caution);
  } catch (error) {
    console.log("Ошибка при сохранении caution: ", error);
    res.status(500).json({ error: "Ошибка при добавлении caution" });
  }
};

module.exports = { getCautions, getCautionById, addCaution };
