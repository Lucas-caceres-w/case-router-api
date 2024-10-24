const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const Certificacion = sequelize.define('certificacion', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   fileName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   fechaInicio: {
      type: DataTypes.DATE,
      allowNull: true,
   },
   fechaExpiracion: {
      type: DataTypes.DATE,
      allowNull: true,
   },
   tipoDocumento: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   tipoEvaluacion: {
      type: DataTypes.STRING,
      allowNull: true,
   },
   personalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: 'personals', // Nombre de la tabla que hace referencia
         key: 'id',
      },
      onDelete: 'CASCADE',
   },
});

module.exports = Certificacion;
