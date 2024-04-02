// routes/casos.js
const express = require("express");
const {
  getCasos,
  getOne,
  updateCaso,
  createCaso,
  deleteCaso,
  CambiarEstatus,
  importData,
  getCasosByDate,
} = require("../controllers");
const router = express.Router();

router.get("/", getCasos);

router.post("/", createCaso);

router.get("/:id", getOne);

router.patch("/:id", updateCaso);

router.delete("/:id", deleteCaso);

router.patch("/estatus/:id", CambiarEstatus);

router.post("/data-import", importData);

router.post("/dates", getCasosByDate);

module.exports = router;
