const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  rol: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Usuario;
