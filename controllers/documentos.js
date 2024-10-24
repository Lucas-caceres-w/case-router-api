const { Docs, Casos } = require('../models'); // Asegúrate de usar el nombre correcto del modelo

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
            cambioOrden: new Date(),
            diasAdicionales: daysAdd,
         });
      }

      res.status(200).json('Documento agregado correctamente');
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
};

module.exports = {
   getDocs,
   uploadDoc,
   AddDocument,
   getDocsByCasoId,
};
