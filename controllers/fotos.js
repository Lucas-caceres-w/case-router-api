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
  let status;
  try {
    if (files.length > 0) {
      const fileNames = files.map((e) => e.filename);
      let fotos = await Fotos.findOne({ where: { casoId: id } });

      if (fotos && fotos.fotosGrales) {
        const existingPhotos = fotos.fotosGrales;
        let newFotos = [...existingPhotos, ...fileNames];
        //console.log(existingPhotos, newFotos);

        await Fotos.update(
          { fotosGrales: newFotos },
          { where: { casoId: id } }
        );
        status = "ok";
      } else {
        //console.log(fileNames);

        await Fotos.update(
          { fotosGrales: fileNames },
          { where: { casoId: id } }
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

module.exports = {
  getFotos,
  getFotoByCasoId,
  saveFotos,
};
