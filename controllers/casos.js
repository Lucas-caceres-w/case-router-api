const { Op } = require('sequelize');
const sequelize = require('../config/connect');
const { Docs, Casos, Fotos } = require('../models');
const fs = require('fs');
const path = require('path');

const deleteDocument = async (idCaso, next) => {
   try {
      const documento = await Docs.findOne({
         where: { proyectoId: idCaso },
         attributes: {
            exclude: ['id', 'proyectoId', 'createdAt', 'updatedAt'],
         },
      });

      const fotos = await Fotos.findOne({
         where: { proyectoId: idCaso },
         attributes: {
            exclude: ['id', 'proyectoId', 'createdAt', 'updatedAt'],
         },
      });
      if (documento) {
         const columnas = Object.keys(documento.toJSON());
         if (columnas && columnas?.length > 0) {
            for (const columna of columnas) {
               const valor = documento[columna];
               if (Array.isArray(valor) && valor.length > 0) {
                  for (const ruta of valor) {
                     console.log(ruta)
                     if (ruta) {
                        const filePath = path.join(
                           __dirname,
                           '../public/pdf_temp/',
                           ruta
                        );
                        try {
                           if (fs.existsSync(filePath)) {
                              fs.unlinkSync(filePath);
                              console.log(`Archivo ${ruta} eliminado`);
                           } else {
                              console.log(
                                 `El archivo ${ruta} no existe, no se pudo eliminar`
                              );
                           }
                        } catch (err) {
                           console.error(err);
                        }
                     }
                  }
               }
            }
         }
      }
      if (fotos) {
         const fotosGrales = fotos.fotosGrales;
         if (fotosGrales && fotosGrales?.length > 0) {
            fotosGrales.map((fot, idx) => {
               if (fot) {
                  const filePath = path.join(
                     __dirname,
                     '../public/fotos_casos/',
                     fot
                  );
                  console.log(filePath);
                  if (fs.existsSync(filePath)) {
                     fs.unlinkSync(filePath);
                     console.log(`Archivo ${fot} eliminado`);
                  } else {
                     console.log(
                        `El archivo ${fot} no existe, no se pudo eliminar`
                     );
                  }
               }
            });
         }
         return 'Se eliminaron los documentos';
      }
   } catch (error) {
      console.error('Error al eliminar los archivos:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
   }
};

/* CONSULTAS HTTP */

const getCasos = async (req, res) => {
   try {
      const casos = await Casos.findAll({
         include: [
            {
               model: Docs,
               attributes: {
                  exclude: ['createdAt', 'updatedAt'],
               },
            },
            {
               model: Fotos,
               attributes: {
                  exclude: ['createdAt', 'updatedAt'],
               },
            },
         ],
      });
      return res.status(200).json(casos);
   } catch (err) {
      console.log(err);
      return res.status(500).json(err);
   }
};

const getCasosByDate = async (req, res) => {
   const { desde, hasta } = await req.body;

   try {
      const casos = await Casos.findAll({
         where: {
            createdAt: {
               [Op.between]: [desde, hasta],
            },
         },
         include: [Docs],
      });
      console.log(casos);
      return res.status(200).json(casos);
   } catch (err) {
      return res.status(500).json(err);
   }
};

const getOne = async (req, res) => {
   try {
      const caso = await Casos.findOne({
         where: { id: req.params.id },
         include: [Docs, Fotos],
      });
      return res.status(200).json(caso);
   } catch (err) {
      return res.status(500).json('El caso no fue encontrado');
   }
};

const createCaso = async (req, res) => {
   const data = await req.body;
   try {
      const existCaso = await Casos.findOne({
         where: {
            numeroProyecto: data.numeroProyecto,
         },
      });
      console.log(existCaso);
      if (!existCaso) {
         const result = await Casos.create(data);
         if (result) {
            await Docs.create({
               proyectoId: result.id,
            });

            await Fotos.create({
               proyectoId: result.id,
            });

            return res.status(200).json('Proyecto creado');
         } else {
            return res
               .status(200)
               .json('error al crear las fotos o documentos');
         }
      } else {
         return res.status(200).json('el proyecto existe');
      }
   } catch (err) {
      console.log(err);
      return res.status(500).json(err);
   }
};

const updateCaso = async (req, res) => {
   const id = await req.params.id;
   const data = await req.body;
   console.log(data)
   try {
      const result = await Casos.update(data, {
         where: {
            id: id,
         },
      });
      console.log(result);
      return res.status(201).json('Caso actualizado');
   } catch (err) {
      return res.status(500).json(err);
   }
};

const deleteCaso = async (req, res) => {
   const id = await req.params.id;
   try {
      const exist = await Casos.count({ where: { id: id } });
      console.log(exist);
      if (exist) {
         await deleteDocument(id);
         const result = await Casos.destroy({
            where: {
               id: id,
            },
         });
         console.log(result);
         return res.status(200).json('caso eliminado');
      } else {
         return res.status(404).json('No existe el caso');
      }
   } catch (err) {
      return res.status(500).json(err);
   }
};

const CambiarEstatus = async (req, res) => {
   const idCaso = await req.params.id;
   const estatus = await req.body.estatus;

   try {
      const result = await Casos.update(
         { estatus: estatus },
         {
            where: {
               id: idCaso,
            },
         }
      );

      return res.status(200).json('Caso cambio a: ' + estatus);
   } catch (err) {
      return res.status(500).json(err);
   }
};

const importData = async (req, res) => {
   const data = await req.body;
   try {
      const existCaso = await Casos.findAll({
         where: {
            numeroProyecto: {
               [Op.in]: data.map((e) => e.numeroProyecto),
            },
         },
      });

      const newData = data.filter((newCase) => {
         return !existCaso.some(
            (existingCase) =>
               existingCase.numeroProyecto === newCase.numeroProyecto.toString()
         );
      });

      if (newData.length > 0) {
         const transaction = await sequelize.transaction();

         const createdCasos = await Casos.bulkCreate(newData, {
            validate: true,
            transaction,
         });

         for (const caso of createdCasos) {
            await Docs.create({ proyectoId: caso.id }, { transaction });

            await Fotos.create({ proyectoId: caso.id }, { transaction });
         }
         await transaction.commit();

         console.log(createCaso);
         return res.status(200).json('AddCases');
      } else {
         return res.status(200).json('noAdd');
      }
   } catch (err) {
      return res.status(500).json(err);
   }
};

module.exports = {
   getCasos,
   getOne,
   createCaso,
   getCasosByDate,
   deleteDocument,
   updateCaso,
   deleteCaso,
   CambiarEstatus,
   importData,
};
