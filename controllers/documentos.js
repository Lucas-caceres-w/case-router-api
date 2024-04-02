const { Docs } = require("../models");

const getDocs = async (req, res) => {
  try {
    const docs = await Docs.findAll();

    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json(err);
  }
};

const uploadDoc = async (req, res) => {
  try {
    const result = await Documento.create(req.body);

    res.status(200).json("Archivo subido correctamente");
  } catch (err) {
    res.status(500).json(err);
  }
};

const AddDocument = async (req, res) => {
  const id = await req.params.id;
  const fileName = req.file.filename;
  const tipo = req.body.option;
  try {
    const data = {};
    data[tipo] = fileName;
    const result = await Docs.update(data, {
      where: {
        casoId: id,
      },
    });

    res.status(200).json("Se agrego el documento");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getDocs,
  uploadDoc,
  AddDocument,
};
