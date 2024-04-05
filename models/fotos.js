const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const Caso = require("./casos");

const Fotos = sequelize.define("Fotos", {
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
  fotoAreaSistemaAgua: {
    type: DataTypes.TEXT,
  },
  fotoAreaAlcantarillado: {
    type: DataTypes.TEXT,
  },
  fotosGrales: {
    type: DataTypes.JSON,
  },
});

module.exports = Fotos;
