const express = require("express");
const app = express();
const errorHandler = require("./utils/middlewares/errorHandle");
const setHeaders = require("./utils/middlewares/setHeaders");
const routes = require("./routes/index.js");
const sequelize = require("./config/connect");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));

app.use(express.static("public"));

app.use(cors());

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((error) => {
    console.error("Error al sincronizar modelos con la base de datos:", error);
  });

app.use(setHeaders);

app.use("/api", routes);

app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log("server on http://localhost:" + port);
});
