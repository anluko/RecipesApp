const express = require("express");
const router = express.Router();
const {
  getDigests,
  getDigestById,
  addDigest,
} = require("../controllers/digestsController");

router.get("/", getDigests);

router.get("/:id", getDigestById);

router.post("/add", addDigest);

module.exports = router;
