const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const config =
  "postgres://case_router_user:l4gFkroZtimwFtsFM55pKOFq4Rq61gnP@dpg-co71tfen7f5s738f9rt0-a/case_router";
const configsql = {
  host: process.env.HOST_HOST_DB,
  username: process.env.HOST_USER_DB,
  password: process.env.HOST_PASSWORD_DB,
  database: process.env.HOST_DATABASE,
  port: process.env.HOST_PORT_DB,
  dialect: "mysql",
};

const sequelize = new Sequelize(configsql);

module.exports = sequelize;
