const Digest = require("../models/Digest");

const getDigests = async (req, res) => {
  const digests = await Digest.findAll();
  res.status(200).json(digests);
};

const getDigestById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id))
    return res.status(400).json({ error: "ID должен быть числом" });

  const digests = await Digest.findByPk(id);
  if (!digests) return res.status(404).json({ error: "Digest не найден" });

  res.status(200).json(digests);
};

const addDigest = async (req, res) => {
  try {
    const digest = await Digest.create(req.body);
    res.status(201).json(digest);
  } catch (error) {
    console.log("Ошибка при сохранении digest: ", error);
    res.status(500).json({ error: "Ошибка при добавлении digest" });
  }
};

module.exports = { getDigests, getDigestById, addDigest };
