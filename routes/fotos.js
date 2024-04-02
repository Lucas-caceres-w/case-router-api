const express = require("express");
const {
  getFotos,
  saveFotos,
  getFotoByCasoId,
} = require("../controllers/index");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/fotos_casos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.get("/", getFotos);

router.get("/:id", getFotoByCasoId);

router.post("/:id", uploads.array("photos", 5), saveFotos);

module.exports = router;
