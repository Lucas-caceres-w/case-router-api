const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const Caso = require("./casos");

const Documento = sequelize.define("documentos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  casoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "casos",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  escrituras: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  evidenciaServicio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  evidenciaTitularidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plano: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  planoInscripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  planoSituacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fotoPredioArea: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  memorialSubsanacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  memoExplicativo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mapaEsquematico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  credencialIngArq: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  crtAut: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  AAA1190: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cartaRecomendacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Documento;
