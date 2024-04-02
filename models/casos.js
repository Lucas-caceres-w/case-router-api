const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connect");

const Caso = sequelize.define("casos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  latitud: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitud: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  asignadoPor: {
    type: DataTypes.STRING,
  },
  nombreInspector: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nroOgpeSbp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nroCatastro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaRevision: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
  estatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "iniciado", // iniciado | en proceso | completado
  },
  region: {
    type: DataTypes.STRING,
  },
  pueblo: {
    type: DataTypes.STRING,
  },
  areaOperacional: {
    type: DataTypes.STRING,
  },
  fechaRecibido: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Caso;
