const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const Personal = sequelize.define('personal', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   idPersonal: {
      type: DataTypes.BIGINT,
      unique: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   secondName: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   apellidoPaterno: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   apellidoMaterno: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   numContacto: {
      type: DataTypes.BIGINT,
      allowNull: false,
   },
   trabaja: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
   },
   observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
});

module.exports = Personal;
