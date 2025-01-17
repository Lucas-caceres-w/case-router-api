const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const Documento = sequelize.define('documentos', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   proyectoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: 'casos',
         key: 'id',
      },
      onDelete: 'CASCADE',
   },
   planAsbesto: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   planPlomo: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   estudioAsbesto: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   estudioEnmendado: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   estudioPlomo: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   estudioPlomoEnmendado: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   permisoAsbesto: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   permisoPlomo: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   cambioOrden: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   planosProyectos: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   planosProyectosDemolicion: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   planosCambioOrden: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   documentosCambioOrden: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   noPresenciaABS: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   noPresenciaLBL: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   manifiesto: {
      type: DataTypes.JSON,
      allowNull: true,
   },
   otros: {
      type: DataTypes.JSON,
      allowNull: true,
   },
});

module.exports = Documento;
