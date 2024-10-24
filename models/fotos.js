const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

const Fotos = sequelize.define("Fotos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  proyectoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "casos",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  fotosGrales: {
    type: DataTypes.JSON,
  },
});

module.exports = Fotos;
