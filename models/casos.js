const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connect');

const Caso = sequelize.define('casos', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   gerenteProyecto: {
      type: DataTypes.STRING,
   },
   superintendenteProyecto: {
      type: DataTypes.STRING,
   },
   supervisorProyecto: {
      type: DataTypes.STRING,
   },
   nombreCliente: {
      type: DataTypes.STRING,
   },
   nombreProyecto: {
      type: DataTypes.STRING,
   },
   numeroProyecto: {
      type: DataTypes.STRING,
      unique: true,
   },
   direccionProyecto: {
      type: DataTypes.STRING,
   },
   latitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
   },
   longitud: {
      type: DataTypes.DOUBLE,
      allowNull: false,
   },
   pueblo: {
      type: DataTypes.STRING,
   },
   proyectoCompletados: {
      type: DataTypes.INTEGER,
   },
   estatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'nuevo',
   },
   descripcionProyecto: {
      type: DataTypes.STRING,
   },
   fechaAdjudicado: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
   },
   materialRemovido: {
      type: DataTypes.STRING,
   },
   materialARemover: {
      type: DataTypes.STRING,
   },
   cantidadDesperdiciada: {
      type: DataTypes.STRING,
   },
   cantidadEstimada: {
      type: DataTypes.STRING,
   },
   fechaRecibido: {
      type: DataTypes.DATE,
      allowNull: true,
   },
   cambioOrden: {
      type: DataTypes.DATE,
      allowNull: true,
   },
   orden: {
      type: DataTypes.STRING,
   },
   clearenceAsbesto: {
      type: DataTypes.STRING,
   },
   clearencePlomo: {
      type: DataTypes.STRING,
   },
   diasAdicionales: {
      type: DataTypes.INTEGER,
   },
   fechaInicio: {
      type: DataTypes.DATE,
      allowNull: true,
   },
   fechaFin: {
      type: DataTypes.DATE,
      allowNull: true,
   },
   observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
});

module.exports = Caso;
