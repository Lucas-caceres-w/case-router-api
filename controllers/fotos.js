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
    const fotos = await Fotos.findOne({
      where: {
        proyectoId: id,
      },
    });
    res.status(200).json(fotos);
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveFotos = async (req, res) => {
  const id = await req.params.id;
  const files = req.files;
  let status;
  try {
    if (files.length > 0) {
      const fileNames = files.map((e) => e.filename);
      let fotos = await Fotos.findOne({ where: { proyectoId: id } });

      if (fotos && fotos.fotosGrales) {
        const existingPhotos = fotos.fotosGrales;
        let newFotos = [...existingPhotos, ...fileNames];
        //console.log(existingPhotos, newFotos);

        await Fotos.update(
          { fotosGrales: newFotos },
          { where: { proyectoId: id } }
        );
        status = "ok";
      } else {
        //console.log(fileNames);

        await Fotos.update(
          { fotosGrales: fileNames },
          { where: { proyectoId: id } }
        );

        status = "ok";
      }
    } else {
      status = "No hay archivos para guardar";
    }

    return res.status(200).json(status);
  } catch (err) {
    for (let i = 0; i < files.length; i++) {
      setTimeout(() => {
        fs.unlinkSync(`fotos_casos/${files[i].filename}`);
      }, 1000);
    }
    console.log(err);
  }
};

const deleteFotos = async (req, res) => {
  const id = req.params.id;
  const { path } = await req.body;

  try {
    const fotos = await Fotos.findOne({
      where: {
        proyectoId: id,
      },
    });
    if (!fotos) {
      return res.status(203).json("no existen fotos");
    }

    fotos.fotosGrales = fotos.fotosGrales.filter((item) => item !== path);

    fotos.save();

    fs.unlinkSync(`public/fotos_casos/${path}`);

    return res.status(200).json("Imagen eliminada");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

module.exports = {
  getFotos,
  deleteFotos,
  getFotoByCasoId,
  saveFotos,
};
