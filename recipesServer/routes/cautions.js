const express = require("express");
const router = express.Router();
const {
  getCautions,
  getCautionById,
  addCaution,
} = require("../controllers/cautionsController");

router.get("/", getCautions);

router.get("/:id", getCautionById);

router.post("/add", addCaution);

module.exports = router;
