const { Docs, Casos } = require('../models'); // Asegúrate de usar el nombre correcto del modelo
const path = require('path');
const fs = require('fs');

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
      const result = await Docs.create(req.body);
      res.status(200).json('Archivo subido correctamente');
   } catch (err) {
      res.status(500).json(err);
   }
};

const getDocsByCasoId = async (req, res) => {
   const id = req.params.id;
   try {
      const docs = await Docs.findOne({
         where: {
            proyectoId: id,
         },
      });
      res.status(200).json(docs);
   } catch (err) {
      res.status(500).json(err);
   }
};

const AddDocument = async (req, res) => {
   const id = req.params.id;
   const fileName = req.file.filename;
   const tipo = req.body.option;
   const daysAdd = req.body.days;
   const date = req.body.date;

   try {
      const documento = await Docs.findOne({
         where: { proyectoId: id },
      });

      const proyecto = await Casos.findOne({
         where: { id: id },
      });

      if (!documento) {
         return res.status(404).json({ message: 'Documento no encontrado' });
      }

      const currentArray = documento[tipo] || [];

      const updatedArray = [...currentArray, fileName];

      documento[tipo] = updatedArray;

      await documento.save();

      if (tipo === 'cambioOrden') {
         await proyecto.update({
            cambioOrden: new Date(date),
            diasAdicionales: daysAdd,
         });
      }

      res.status(200).json('Documento agregado correctamente');
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
};

const deleteDocsById = async (req, res) => {
   const id = req.params.id;
   const { file, key } = req.body;
   try {
      const docs = await Docs.findOne({ where: { id: id } });
      const Caso = await Casos.findOne({ where: { id: id } });
      if (docs && docs[key] && Array.isArray(docs[key])) {
         const fileIndex = docs[key].indexOf(file);
         if (fileIndex !== -1) {
            const filePath = path.join(__dirname, '../public/pdf_temp/', file);
            if (fs.existsSync(filePath)) {
               fs.unlinkSync(filePath);
               if (key === 'cambioOrden') {
                  Caso.update({ diasAdicionales: null });
               }
            } else {
               res.status(404).json({
                  message: 'El archivo especificado no existe en el registro.',
               });
            }
            docs[key].splice(fileIndex, 1);
            await Docs.update({ [key]: docs[key] }, { where: { id: id } });

            res.status(200).json('Documento eliminado');
         } else {
            res.status(404).json({
               message: 'El archivo especificado no existe en el registro.',
            });
         }
      } else {
         res.status(404).json({
            message: 'El documento o campo especificado no existe.',
         });
      }
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
   }
};

const getOrderDays = async (req, res) => {
   const { id } = await req.params;
   try {
      const docs = await Casos.findOne({
         where: {
            id: id,
         },
      });
      const response = [docs.id, docs.diasAdicionales];
      res.status(200).json(response);
   } catch (err) {
      res.status(500).json(err);
   }
};

const editOrderDays = async (req, res) => {
   const { id, value } = await req.body;
   try {
      const docs = await Casos.findOne({
         where: {
            id: id,
         },
      });

      docs.update({ diasAdicionales: value });

      docs.save();

      res.status(200).json(docs);
   } catch (err) {
      res.status(500).json(err);
   }
};

module.exports = {
   getDocs,
   uploadDoc,
   AddDocument,
   getDocsByCasoId,
   deleteDocsById,
   getOrderDays,
   editOrderDays,
};
