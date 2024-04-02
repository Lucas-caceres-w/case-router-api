const Fotos = require("./fotos");
const Casos = require("./casos");
const Docs = require("./documentos");

// Define las relaciones entre los modelos
Casos.hasOne(Fotos);
Fotos.belongsTo(Casos);

Casos.hasOne(Docs);
Docs.belongsTo(Casos);

module.exports = {
  Fotos,
  Casos,
  Docs,
};
