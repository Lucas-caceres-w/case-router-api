const { Op, Sequelize } = require('sequelize');
const { Personal, Certificacion } = require('../models');
const path = require('path')
const fs = require('fs')
const sequelize = require('../config/connect');

const getPersonal = async (req, res) => {
   const { estatus } = req.query;
   let result;
   try {
      if (estatus === 'all') {
         result = await Personal.findAll({
            include: Certificacion,
            order: [[{ model: Certificacion }, 'id', 'DESC']],
         });
      } else {
         result = await Personal.findAll({
            where:
               estatus === 'active'
                  ? { trabaja: true }
                  : {
                       [Op.or]: [
                          { trabaja: false },
                          Sequelize.literal(
                             '(SELECT COUNT(*) FROM certificacions WHERE certificacions.personalId = personal.id) = 0'
                          ),
                       ],
                    },
            include: [
               {
                  model: Certificacion,
                  required: false,
               },
            ],
            order: [[{ model: Certificacion }, 'id', 'DESC']],
         });
      }

      return res.status(200).json(result);
   } catch (err) {
      return res.status(404).json(err);
   }
};

const getPersonalById = async (req, res) => {
   const id = req.params.id;
   try {
      const result = await Personal.findOne({
         where: { id },
      });
      console.log(result);

      return res.status(200).json(result);
   } catch (err) {
      return res.status(404).json(err);
   }
};

const getPersonalByDate = async (req, res) => {
   const { desde, hasta, estatus } = await req.body;

   console.log(desde, hasta, estatus);
   try {
      const personal = await Personal.findAll({
         where: {
            ...(estatus === 'active'
               ? { trabaja: true }
               : {
                    [Op.or]: [
                       { trabaja: false },
                       Sequelize.literal(
                          '(SELECT COUNT(*) FROM certificacions WHERE certificacions.personalId = personal.id) = 0'
                       ),
                    ],
                 }),
            createdAt: {
               [Op.between]: [desde, hasta],
            },
         },
         include: [Certificacion],
      });
      console.log(personal);
      return res.status(200).json(personal);
   } catch (err) {
      console.log(err);
      return res.status(500).json(err);
   }
};

const addPersonal = async (req, res) => {
   const body = req.body;
   console.log(body);
   try {
      const result = await Personal.create(body);
      console.log(result);
      return res.status(200).json('personal agregado');
   } catch (err) {
      console.log(err);
      return res.status(404).json(err);
   }
};

const updatePersonal = async (req, res) => {
   const body = await req.body;
   const id = await req.params.id;
   try {
      const result = await Personal.update(body, { where: { id: id } });

      return res.status(200).json('personal actualizado');
   } catch (err) {
      return res.status(404).json(err);
   }
};

const deletePersonal = async (req, res) => {
   const id = req.params.id;
   try {
      const result = await Personal.destroy({ where: { id } });

      return res.status(200).json('personal eliminado');
   } catch (err) {
      return res.status(404).json(err);
   }
};

const addDocs = async (req, res) => {
   const { id } = req.params;
   const fileName = req.file.filename;
   const { tipo, inicio, exp, tipoEvaluacion } = req.query;

   try {
      const personal = await Personal.findByPk(id);
      if (!personal) {
         return res.status(404).json('Personal no encontrado');
      }

      const nuevoDocumento = await Certificacion.create({
         fileName,
         fechaInicio: inicio,
         fechaExpiracion: exp,
         tipoDocumento: tipo,
         tipoEvaluacion: tipoEvaluacion,
         personalId: id,
      });

      return res.status(200).json({
         message: 'Documento agregado exitosamente',
         documento: nuevoDocumento,
      });
   } catch (err) {
      console.error(err);
      return res.status(400).json(err);
   }
};

const importPersonal = async (req, res) => {
   const data = await req.body;
   //console.log(data)
   try {
      const existPers = await Personal.findAll({
         where: {
            idPersonal: {
               [Op.in]: data.map((e) => e.idPersonal),
            },
         },
      });

      const newData = data.filter((newP) => {
         return !existPers.some(
            (existPersonal) =>
               existPersonal.idPersonal === newP.idPersonal.toString()
         );
      });

      if (newData.length > 0) {
         const transaction = await sequelize.transaction();

         const createdPersonal = await Personal.bulkCreate(newData, {
            validate: true,
            transaction,
         });

         /* for (const personal of createdPersonal) {
            await Certificacion.create({ id: personal.id }, { transaction });
         } */
         await transaction.commit();

         console.log(createdPersonal);
         return res.status(200).json('AddCases');
      } else {
         return res.status(200).json('noAdd');
      }
   } catch (err) {
      console.log(err);
      return res.status(500).json(err);
   }
};

const getCertificaciones = async (req, res) => {
   const id = req.params.id;
   try {
      const result = await Personal.findOne({
         where: { id },
         include: [Certificacion],
      });
      console.log(result);
      return res.status(200).json(result);
   } catch (err) {
      console.log(err);
      return res.status(404).json(err);
   }
};

const deleteCertificacion = async (req, res) => {
   const idCert = req.params.id;
   try {
      const certificado = await Certificacion.findOne({
         where: { id: idCert },
      });
      
      if (certificado) {
         const file = certificado.fileName;
         const filePath = path.join(__dirname, '../public/pdf_personal/', file);
         if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Archivo ${file} eliminado del sistema de archivos.`);
            await Certificacion.destroy({
               where: { id: idCert },
            });
         } else {
            console.log(
               `El archivo ${file} no existe en el sistema de archivos.`
            );
         }
      }
      return res.status(200).json('Certificacion eliminada');
   } catch (err) {
      console.log(err);
      return res.status(404).json(err);
   }
};

module.exports = {
   getPersonalById,
   addPersonal,
   updatePersonal,
   deletePersonal,
   addDocs,
   getPersonal,
   getPersonalByDate,
   importPersonal,
   getCertificaciones,
   deleteCertificacion,
};
