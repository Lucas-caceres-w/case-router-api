const path = require("path");
const Fotos = require("../models/fotos");
const fs = require("fs");

const getFotos = async (req, res) => {
  try {
    const casos = await Fotos.findAll();
    console.log(casos);
    res.status(200).json(casos);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFotoByCasoId = async (req, res) => {
  const id = req.params.id;
  try {
    const casos = await Fotos.findOne({
      where: {
        casoId: id,
      },
    });
    res.status(200).json(casos);
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveFotos = async (req, res) => {
  const id = await req.params.id;
  const files = req.files;
  try {
    if (files.length > 0) {
      const fileNames = { fotosGrales: files.map((e) => e.filename) };
      const fotos = await Fotos.update(fileNames, {
        where: {
          casoId: id,
        },
      });
      //si no se guardaron las imagenes borrar las fotos
      return res.status(200).json("Fotos guardadas correctamente");
    } else {
      return res.status(400).json("No hay archivos para guardar");
    }
  } catch (err) {
    for (let i = 0; i < files.length; i++) {
      setTimeout(() => {
        fs.unlinkSync(`fotos_casos/${files[i].filename}`);
      }, 1000);
    }
    console.log(err);
  }
};

module.exports = {
  getFotos,
  getFotoByCasoId,
  saveFotos,
};
