const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const config =
  "postgres://case_router_user:l4gFkroZtimwFtsFM55pKOFq4Rq61gnP@dpg-co71tfen7f5s738f9rt0-a/case_router";
const configsql = {
  host: process.env.HOST_DB,
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
  dialect: "mysql",
};

const sequelize = new Sequelize(config);

module.exports = sequelize;
